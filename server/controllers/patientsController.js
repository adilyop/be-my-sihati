/**
 * Created by adil on 03/01/17.
 */
/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';
import stream from 'stream';
import phone from 'phone';
import { Patients } from '../models/index.js';

const ObjectId = mongoose.Types.ObjectId;
import Grid from 'gridfs-stream';
import Q from 'q';

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

function getAllPatients(filter, pagination) {
  let skip = 0;
  let limit = 10;
  const query = {};
  if (pagination !== undefined && 'skip' in pagination && !isNaN(pagination.skip)) { skip = Number(pagination.skip); }
  if (pagination !== undefined && 'limit' in pagination && !isNaN(pagination.skip)) { limit = Number(pagination.limit); }
  if ('sub_facility_id' in filter && ObjectId.isValid(filter.sub_facility_id)) { query.sub_facility_id = ObjectId(filter.sub_facility_id); }
  query.deleted = false;
  return Patients.aggregate([
    {
      $match: query,
    },
    { $sort: { _id: -1 } },
    {
      $lookup: {
        from: 'calllogs',
        localField: '_id',
        foreignField: 'patient_id',
        as: 'calllogs',
      },
    },
    {
      $lookup: {
        from: 'queues',
        localField: '_id',
        foreignField: 'patient_id',
        as: 'queues',
      },
    },
    {
      $project: {
        _id: 1,
        first_name: 1,
        last_name: 1,
        phone_number: 1,
        email_address: 1,
        sub_facility_id: 1,
        deleted: 1,
        ssn: 1,
        patient_number: 1,
        resources: {
          $filter: {
            input: '$resources',
            as: 'resource',
            cond: {
              $eq: ['$$resource.deleted', false]
            }
          }
        },
        discharge_status: 1,
        time_zone: 1,
        callLogs: { start: '$calllogs.end_date', end: '$calllogs.start_date' },
        queues: {
          $filter: {
            input: '$queues',
            as: 'queue',
            cond: {
              $eq: ['$$queue.deleted', false]
            }
          }
        },
      },
    },
    {
      $group: {
        _id: null,
        docs: { $push: '$$ROOT' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        count: 1,
        docs: {
          $slice: [
            '$docs', skip, limit
          ]
        }
      }
    }
  ]).then((patientDocs) => {
    if (patientDocs.length === 0) return Promise.resolve({ docs: [], count: 0 });
    const patientDoc = patientDocs[0];
    const patientsDoc = patientDoc.docs;
    const totalCount = patientDoc.count;
    return Patients.populate(patientsDoc, [{ path: 'sub_facility_id' }])
      .then((patients) => {
        if (patients.length === 0) return Promise.resolve({ docs: [], count: 0 });
        const result = [];
        for (let i = 0; i < patients.length; i += 1) {
          let duration = 0;
          for (let j = 0; j < patients[i].callLogs.start.length; j += 1) {
            const startDate = new Date(patients[i].callLogs.start[j]);
            const endDate = new Date(patients[i].callLogs.end[j]);
            const tempDuration = (startDate.getTime() - endDate.getTime()) / 1000;
            duration += tempDuration;
          }
          const date = new Date(null);
          date.setSeconds(duration);
          const time = date.toISOString().substr(11, 8);
          patients[i].duration = time;
          delete patients[i].callLogs;
          result.push(patients[i]);
        }
        return Promise.resolve({ docs: patients, count: totalCount });
      });
  }).catch(err => Promise.reject(err));
}
function searchPatients(filter, pagination) {
  let skip = 0;
  let limit = 10;
  const search = {};
  if (pagination !== undefined && 'skip' in pagination && !isNaN(pagination.skip)) { skip = Number(pagination.skip); }
  if (pagination !== undefined && 'limit' in pagination && !isNaN(pagination.skip)) { limit = Number(pagination.limit); }
  if (('first_name' in filter) && filter.first_name !== '' && filter.first_name !== undefined) { search.first_name = new RegExp(filter.first_name, 'i'); }
  if (('last_name' in filter) && filter.last_name !== '' && filter.last_name !== undefined) { search.last_name = new RegExp(filter.last_name, 'i'); }
  if (('phone_number' in filter) && filter.phone_number !== '' && filter.phone_number !== undefined) { search.phone_number = new RegExp(filter.phone_number, 'i'); }
  if (('email_address' in filter) && filter.email_address !== '' && filter.email_address !== undefined) { search.email_address = new RegExp(filter.email_address, 'i'); }
  if (('discharge_status' in filter) && filter.discharge_status !== '' && filter.discharge_status !== undefined) { search.discharge_status = new RegExp(['^', filter.discharge_status, '$'].join(''), 'i'); }
  if ('sub_facility_id' in filter && ObjectId.isValid(filter.sub_facility_id)) { search.sub_facility_id = ObjectId(filter.sub_facility_id); }
  search.deleted = false;
  return Patients.aggregate(
    [
      {
        $match: search,
      },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'calllogs',
          localField: '_id',
          foreignField: 'patient_id',
          as: 'calllogs',
        },
      },
      {
        $lookup: {
          from: 'queues',
          localField: '_id',
          foreignField: 'patient_id',
          as: 'queues',
        },
      },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          phone_number: 1,
          email_address: 1,
          sub_facility_id: 1,
          deleted: 1,
          ssn: 1,
          patient_number: 1,
          resources: {
            $filter: {
              input: '$resources',
              as: 'resource',
              cond: {
                $eq: ['$$resource.deleted', false]
              }
            }
          },
          discharge_status: 1,
          time_zone: 1,
          callLogs: { start: '$calllogs.end_date', end: '$calllogs.start_date' },
          queues: {
            $filter: {
              input: '$queues',
              as: 'queue',
              cond: {
                $eq: ['$$queue.deleted', false]
              }
            }
          },
        },
      },
      {
        $group: {
          _id: null,
          docs: { $push: '$$ROOT' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          docs: {
            $slice: [
              '$docs', skip, limit
            ]
          }
        }
      }
    ]).then((patientDocs) => {
      if (patientDocs.length === 0) return Promise.resolve({ docs: [], count: 0 });
      const patientDoc = patientDocs[0];
      const patientsDoc = patientDoc.docs;
      const totalCount = patientDoc.count;
      return Patients.populate(patientsDoc, [{ path: 'sub_facility_id' }])
        .then((patients) => {
          if (patients.length === 0) return Promise.resolve({ docs: [], count: 0 });
          const result = [];
          for (let i = 0; i < patients.length; i += 1) {
            let duration = 0;
            for (let j = 0; j < patients[i].callLogs.start.length; j += 1) {
              const startDate = new Date(patients[i].callLogs.start[j]);
              const endDate = new Date(patients[i].callLogs.end[j]);
              const tempDuration = (startDate.getTime() - endDate.getTime()) / 1000;
              duration += tempDuration;
            }
            const date = new Date(null);
            date.setSeconds(duration);
            const time = date.toISOString().substr(11, 8);
            patients[i].duration = time;
            delete patients[i].callLogs;
            result.push(patients[i]);
          }
          return Promise.resolve({ docs: patients, count: totalCount });
        });
    }).catch(err => Promise.reject(err));
}
function getPatient(id) {
  return Patients.findById(id).populate('sub_facility_id').exec();
}
function getPatientProfile(id) {
  const deferred = Q.defer();
  const query = {
    _id: id,
  };
  // todo : fix this
  /* var query = {
   _id: id,
   "resources.deleted": { $all: true } }
   var elementQuery = { "deleted": false };
   elementQuery = {resources: {$elemMatch: elementQuery}};*/
  Patients.find(query).populate('sub_facility_id')
    .exec((err, patient) => {
      if (err) {
        deferred.reject(err);
      } else if (patient.length !== 0) {
        patient = patient[0];
        deferred.resolve(patient);
      } else {
        deferred.reject({});
      }
    });
  return deferred.promise;
}
function getResourceContent(patientID, resourceID) {
  const deferred = Q.defer();
  const query = {
    _id: patientID,
    'resources._id': resourceID
  };
  const elementQuery = {
    _id: resourceID
  };
  Patients.findById(query, { resources: { $elemMatch: elementQuery } }, (err, patient) => {
    if (err) {
      deferred.reject(err);
    } else if (patient === null) { deferred.reject({}); } else {
      const resources = patient.resources;
      if (resources.length === 0) {
        deferred.reject({});
      } else {
        const content = resources[0].content.toString();
        const options = { _id: content };
        const name = resources[0].name;
        const gfs = Grid(conn.db);
        gfs.exist(options, (error) => {
          if (error) {
            deferred.reject(err);
          } else {
            const readStream = gfs.createReadStream(options);
            const buffers = [];
            readStream.on('data', (buffer) => {
              buffers.push(buffer);
            });
            readStream.on('end', () => {
              const buffer = Buffer.concat(buffers);
              const resource = {
                name,
                buffer: buffer.toString(),
              };
              deferred.resolve(resource);
            });
          }
        });
      }
    }
  });
  return deferred.promise;
}
function addPatient(data) {
  if ('phone_number' in data && phone(data.phone_number).length !== 0) {
    data.phone_number = phone(data.phone_number)[0];
  }
  const patient = new Patients(data);
  const filter = {
    _id: patient._id
  };
  return Patients.findOneAndUpdate(filter, patient, { new: true, upsert: true })
    .exec();
}
function updatePatientByFilter(query, body) {
  if ('phone_number' in body && phone(body.phone_number).length !== 0) {
    body.phone_number = phone(body.phone_number)[0];
  }
  return new Promise((resolve, reject) => {
    Patients.update(query, body, { new: true, multi: true }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function updatePatient(patientID, body) {
  if ('phone_number' in body && phone(body.phone_number).length !== 0) {
    body.phone_number = phone(body.phone_number)[0];
  }
  const query = {
    _id: patientID
  };
  return Patients.findOneAndUpdate(query, body, { new: true })
    .populate('sub_facility_id')
    .exec();
}
function deletePatient(id) {
  const query = {
    _id: id
  };
  const body = {
    deleted: true
  };
  return Patients.findOneAndUpdate(query, body, { new: true })
    .populate('sub_facility_id')
    .exec();
}
function deletePatientByFilter(filter) {
  const body = {
    deleted: true
  };
  return new Promise((resolve, reject) => {
    Patients.update(filter, body, { new: true, multi: true }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function attachResource(patientID, data) {
  const query = {
    _id: patientID
  };
  const resources = data;
  for (let i = 0; i < resources.length; i += 1) {
    if (resources[i].resource_type === 'file') {
      const base64str = resources[i].content;
      const resourceStream = new stream.PassThrough();
      resourceStream.write(base64str);
      resourceStream.end();
      const _id = new ObjectId();
      const gfs = Grid(conn.db);
      const writeStream = gfs.createWriteStream({
        _id
      });
      resourceStream.pipe(writeStream);
      resources[i].content = _id;
      resources[i].date_submitted = Date.now();
    }
  }
  const push = {
    $push: {
      resources: { $each: resources }
    }
  };
  return Patients.findOneAndUpdate(query, push, { new: true });
}
function deleteResource(patientID, data) {
  const deferred = Q.defer();
  const query = {
    _id: patientID
  };
  const resources = data.resources;
  getPatient(patientID)
    .then((patient) => {
      const patientResources = patient.resources;
      const resourceUpdated = [];
      for (let i = 0; i < patientResources.length; i += 1) {
        for (let j = 0; j < resources.length; j += 1) {
          if (patientResources[i]._id.toString() === resources[j]) {
            patientResources[i].deleted = true;
          }
        }
        resourceUpdated.push(patientResources[i]);
      }
      const update = { $set: { resources: resourceUpdated } };
      Patients.findOneAndUpdate(query, update, { new: true }, (err, result) => {
        if (err) {
          deferred.reject(err);
        } else if (result === null) { deferred.reject({ error: 'Patients not found' }); } else { deferred.resolve(result); }
      });
    }, (err) => {
      deferred.reject(err);
    });
  return deferred.promise;
}
function updateResource(patientID, resourceID, resource) {
  const deferred = Q.defer();
  const query = {
    _id: patientID
  };
  const queryResource = {
    _id: patientID,
    'resources._id': resourceID
  };
  const elementQuery = {
    _id: resourceID
  };
  Patients.find(query, { resources: { $elemMatch: elementQuery } }, (err, patients) => {
    if (err) {
      deferred.reject(err);
    } else if (patients.length === 0) { deferred.reject({}); } else {
      const patient = patients[0];
      const resources = patient.resources;
      if (resources.length === 0) {
        deferred.reject({});
      } else {
        const json = {
          'resources.$.name': resources[0].name,
          'resources.$.description': resources[0].description,
          'resources.$.resource_type': resources[0].resource_type,
          'resources.$.content': resources[0].content
        };
        if ('name' in resource) { json['resources.$.name'] = resource.name; }
        if ('description' in resource) { json['resources.$.description'] = resource.description; }
        if ('resource_type' in resource) { json['resources.$.resource_type'] = resource.resource_type; }
        if ('content' in resource) {
          const base64str = resource.content;
          const resourceStream = new stream.PassThrough();
          resourceStream.write(base64str);
          resourceStream.end();
          const _id = new ObjectId();
          const gfs = Grid(conn.db);
          const writeStream = gfs.createWriteStream({
            _id
          });
          resourceStream.pipe(writeStream);
          json['resources.$.content'] = _id;
        }
        const push = { $set: json };
        Patients.findOneAndUpdate(queryResource, push, { new: true }, (error, result) => {
          if (error) {
            deferred.reject(error);
          } else if (result === null) { deferred.reject({ error: 'Patients not found' }); } else { deferred.resolve(result); }
        });
      }
    }
  });
  return deferred.promise;
}
function searchResource(patientID, data) {
  const filter = {};
  filter._id = ObjectId(patientID);
  if ('name' in data) { filter['resources.name'] = new RegExp(data.name, 'i'); }
  if ('description' in data) { filter['resources.description'] = new RegExp(data.description, 'i'); }
  if ('medication_name' in data) { filter['resources.medication_name'] = new RegExp(data.medication_name, 'i'); }
  if ('resource_type' in data) { filter['resources.resource_type'] = new RegExp(data.resource_type, 'i'); }
  filter['resources.deleted'] = false;
  return Patients.aggregate([
    { $match: filter },
    { $unwind: '$resources' },
    { $match: filter },
    {
      $group: {
        _id: '$_id',
        resources: { $push: '$resources' }
      }
    }
  ]);
}

export {
  getAllPatients,
  searchPatients,
  getPatient,
  getPatientProfile,
  getResourceContent,
  addPatient,
  updatePatientByFilter,
  updatePatient,
  deletePatient,
  deletePatientByFilter,
  attachResource,
  deleteResource,
  updateResource,
  searchResource,
};
