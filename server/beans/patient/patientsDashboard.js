/**
 * Created by adil on 03/01/17.
 */
/* eslint-disable new-cap, no-param-reassign */

const Q = require('q');
const fs = require('fs');
const events = require('events');
const usersController = require('../../controllers/usersController');
const patientsController = require('../../controllers/patientsController');
const emailsController = require('../../controllers/emailsController');
const recordingController = require('../../controllers/recordingController');
const notesController = require('../../controllers/notesController');
const s3Controller = require('../../controllers/s3Controller');
const reportController = require('../../controllers/reportController');
const Notification = require('./../../services/notification/model/Notification.js');
const NotificationType = require('./../../services/notification/model/NotificationType.js');

const patientDashboardEmitter = new events.EventEmitter();

function resetPassword(patient, credential) {
  const deferred = Q.defer();
  const password = credential.password;
  const filter = {
    'user_type.item': patient._id.toString()
  };
  usersController.getUserByFilter(filter)
    .then((users) => {
      if (users.length !== 0) {
        const user = users[0];
        const id = user._id;
        const data = { password };
        usersController.updateUser(id, data);
        user.username = user.username;
        user.email_address = user.user_type.item.email_address;
        user.password = password;
        emailsController.sendResetPasswordMail(user);
        deferred.resolve({});
      } else {
        deferred.reject({});
      }
    });
  return deferred.promise;
}
function getPatientProfile(patient) {
  const deferred = Q.defer();
  const patientID = patient._id;
  patientsController.getPatientProfile(patientID)
    .then((patientResult) => {
      deferred.resolve(patientResult);
    }, (error) => {
      deferred.reject(error);
    });
  return deferred.promise;
}
function editPatientProfile(patient, data, app) {
  const deferred = Q.defer();
  const notificationManagerContainer = app.get('container');
  const notificationManager = notificationManagerContainer.services['notification.manager'];
  const patientEditNotification = NotificationType.PATIENT_EDIT;
  const patientID = patient._id;
  const json = {};
  if ('time_zone' in data) { json.time_zone = data.time_zone; }
  if ('email_address' in data) { json.email_address = data.email_address; }
  if ('last_name' in data) { json.last_name = data.last_name; }
  if ('first_name' in data) { json.first_name = data.first_name; }
  if ('phone_number' in data) { json.phone_number = data.phone_number; }
  if ('ssn' in data) { json.ssn = data.ssn; }
  patientsController.updatePatient(patientID, json)
    .then((resPatient) => {
      const subFacilityID = resPatient.sub_facility_id._id;
      const notificationSource = {
        kind: 'patient',
        item: patientID
      };
      /* eslint max-len: ["error", 150] */
      const payload = { item: patient, subFacilityId: subFacilityID, source: notificationSource, destination: resPatient };
      const notification = new Notification(patientEditNotification, payload);
      notificationManager.dispatch(notification);
      deferred.resolve(patient);
    }, (error) => {
      deferred.reject(error);
    });
  if ('email_address' in data) {
    const username = data.email_address;
    const body = {
      username
    };
    const filter = {
      'user_type.item': patientID
    };
    usersController.getUserByFilter(filter)
      .then((users) => {
        if (users.length !== 0) {
          const user = users[0];
          const id = user._id;
          usersController.updateUser(id, body);
        }
      });
  }
  return deferred.promise;
}
function downloadResource(patient, resourceID) {
  const deferred = Q.defer();
  const patientID = patient._id;
  patientsController.getResourceContent(patientID, resourceID)
    .then((result) => {
      deferred.resolve(result);
    }, (error) => {
      deferred.reject(error);
    });
  return deferred.promise;
}
function getAllRecordings(patient, data) {
  const deferred = Q.defer();
  const patientID = patient._id;
  const filter = { patient_id: patientID };
  const pagination = {};
  if ('limit' in data) pagination.limit = data.limit;
  if ('skip' in data) pagination.skip = data.skip;
  recordingController.getAllRecordings(filter, pagination)
    .then((result) => {
      deferred.resolve(result);
    }, (err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}
function downloadRecording(patient, recordingID, query) {
  return recordingController.getRecording(recordingID)
    .then((result) => {
      let name = result.name;
      if ('video' in query && (query.video === true || query.video === 'true')) {
        name = `${name}.mp4`;
      } else {
        name += '.mp3';
      }
      return s3Controller.downloadRecording(name);
    });
}
function rawRecording(patient, recordingID, range, query) {
  return recordingController.getRecording(recordingID)
    .then((result) => {
      let name = result.name;
      const isVideo = !!(('video' in query && (query.video === true || query.video === 'true')));
      name = isVideo ? `${name}.mp4` : `${name}.mp3`;
      const contentLength = isVideo ? result.video.content_length : result.audio.content_length;
      const DOWNLOAD_DIR = `${process.cwd()}/recordings/`;
      const fileName = DOWNLOAD_DIR + name;
      if (fs.existsSync(fileName)) {
        if (range) {
          const parts = range.replace(/bytes=/, '').split('-');
          const partialStart = parts[0];
          const partialEnd = parts[1];
          const start = parseInt(partialStart, 10);
          const end = partialEnd ? parseInt(partialEnd, 10) : contentLength - 1;
          const file = fs.createReadStream(fileName, { start, end });
          return Promise.resolve({ file, meta: { start, end, content_length: contentLength } });
        }
        const file = fs.createReadStream(fileName);
        return Promise.resolve({ file, meta: { content_length: contentLength } });
      }
      return new Promise((resolve, reject) => s3Controller.downloadRecording(name)
        .then((buffer) => {
          const writeStream = fs.createWriteStream(fileName);
          writeStream.write(buffer);
          writeStream.on('finish', () => {
            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const partialStart = parts[0];
              const partialEnd = parts[1];
              const start = parseInt(partialStart, 10);
              const end = partialEnd ? parseInt(partialEnd, 10) : contentLength - 1;
              // var chunkSize = start === 0 ? (end - start) : (end - start) + 1;
              const file = fs.createReadStream(fileName, { start, end });
              resolve({
                file,
                meta: { start, end, content_length: contentLength }
              });
            }
            const file = fs.createReadStream(fileName);
            resolve({ file, meta: { content_length: contentLength } });
          });
          writeStream.end();
        }).catch(() => reject({ file: 'Recording is not available', meta: {} })));
    }).catch(() => Promise.reject({ file: 'Recording is not available', meta: {} }));
}
function getAllNotes(patient, pagination) {
  const deferred = Q.defer();
  const filter = { patient: patient._id };
  notesController.getAllNotes(filter, pagination)
    .then((result) => {
      deferred.resolve(result);
    }, (err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}
function searchNotes(patient, filter, pagination) {
  const deferred = Q.defer();
  filter.patient = patient._id;
  notesController.getAllNotes(filter, pagination)
    .then((result) => {
      deferred.resolve(result);
    }, (err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}
function updateRecordingContent(patient, pagination) {
  const deferred = Q.defer();
  let filter = {};
  recordingController.getAllRecordings(filter, pagination)
    .then((recordings) => {
      recordings = recordings.docs;
      recordings.forEach((recording) => {
        setTimeout(() => {
          const name = recording.name;
          const videoName = `${name}.mp4`;
          const audioName = `${name}.mp3`;
          s3Controller.headObject(videoName)
            .then((videoInfo) => {
              s3Controller.headObject(audioName)
                .then((audioInfo) => {
                  filter = { name };
                  const recordingJson = {
                    _id: recording._id,
                    pharmacist_id: recording.pharmacist_id._id,
                    patient_id: recording.patient_id._id,
                    sub_facility_id: recording.sub_facility_id._id,
                    name: recording.name,
                    created_at: recording.created_at,
                    video: {
                      content_unit: 'bytes',
                      content_length: videoInfo.ContentLength,
                      content_type: 'video/mp4'
                    },
                    audio: {
                      content_unit: 'bytes',
                      content_length: audioInfo.ContentLength,
                      content_type: 'audio/mp3'
                    }
                  };
                  recordingController.deleteRecordingByFilter(filter)
                    .then(() => {
                      recordingController.addRecording(recordingJson);
                    });
                });
            });
        });
      }, 0);
      deferred.resolve({});
    });
  return deferred.promise;
}
function searchResources(patient, data) {
  const deferred = Q.defer();
  const patientID = patient._id;
  patientsController.searchResource(patientID, data)
    .then((resources) => {
      deferred.resolve(resources);
    }, (err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}
function getResidentInformation(patient) {
  return reportController.getResidentInformation(patient);
}
function getOtherInformation(patient) {
  return reportController.getOtherInformation(patient);
}
function getPrimaryContact(patient) {
  return reportController.getPrimaryContact(patient);
}
function getPrimaryPhysician(patient) {
  return reportController.getPrimaryPhysician(patient);
}
function getDiagnoses(patient) {
  return reportController.getDiagnoses(patient);
}
function getCurrentMedication(patient) {
  return reportController.getCurrentMedication(patient);
}

exports.default = {
  resetPassword,
  getPatientProfile,
  editPatientProfile,
  downloadResource,
  getAllRecordings,
  downloadRecording,
  rawRecording,
  getAllNotes,
  searchNotes,
  updateRecordingContent,
  searchResources,
  getResidentInformation,
  getOtherInformation,
  getPrimaryContact,
  getPrimaryPhysician,
  getDiagnoses,
  getCurrentMedication,
  patientDashboardEmitter
};
module.exports = exports.default;
