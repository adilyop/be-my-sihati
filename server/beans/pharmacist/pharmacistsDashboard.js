/**
 * Created by adil on 03/01/17.
 */

const Q = require('q');
const moment = require('moment');
const callLogsController = require('../../controllers/callLogsController');
const queuesController = require('../../controllers/queuesController');
const usersController = require('../../controllers/usersController');
const emailsController = require('../../controllers/emailsController');
const pharmacistsController = require('../../controllers/pharmacistsController');
const notificationsController = require('../../controllers/notificationsController');

function getCallLogsStatistics(pharmacist, data) {
  const deferred = Q.defer();
  const startDate = data.start_date;
  const pharmacistID = pharmacist._id;
  if (!pharmacistID) {
    setTimeout(() => {
      const result = {
        error: 'pharmacist id is missing'
      };
      deferred.reject(result);
    }, 0);
  } else {
    let date = new Date();
    date = new Date(date.setMonth(date.getMonth() - 1));
    const filter = startDate === undefined ? { pharmacist_id: pharmacistID } : {
      pharmacist_id: pharmacistID,
      start_date: { $gte: date }
    };
    const pagination = {
      skip: 0,
      limit: 10000
    };
        // todo: we probably need to go past the pagination
    callLogsController.getAllCallLogs(filter, pagination)
            .then((callLogsResult) => {
              const callLogs = callLogsResult.docs;
              let totalSeconds = 0;
              for (let i = 0; i < callLogs.length; i += 1) {
                if ('start_date' in callLogs[i] && 'end_date' in callLogs[i]) {
                  const startTime = moment(callLogs[i].start_date);
                  const endDate = moment(callLogs[i].end_date);
                  const secondDiff = endDate.diff(startTime, 'seconds');
                  totalSeconds += secondDiff;
                }
              }
              /* eslint max-len: ["error", 150] */
              deferred.resolve({ totalCallTime: totalSeconds, totalCallLogs: callLogsResult.count });
            }, (err) => {
              deferred.reject(err);
            });
  }
  return deferred.promise;
}
function getDischargesCount(pharmacist) {
  const deferred = Q.defer();
  const pharmacistID = pharmacist._id;
  if (!pharmacistID) {
    setTimeout(() => {
      const result = {
        error: 'pharmacist id is missing'
      };
      deferred.reject(result);
    }, 0);
  } else {
    const filter = {
      pharmacist_id: pharmacistID,
      status: 'COMPLETED'
    };
    queuesController.getCountQueuesByFilter(filter)
            .then((count) => {
              const result = {
                count
              };
              deferred.resolve(result);
            }, (error) => {
              deferred.reject(error);
            });
  }
  return deferred.promise;
}
function resetPassword(pharmacist, credential) {
  const deferred = Q.defer();
  const password = credential.password;
  const filter = {
    'user_type.item': pharmacist._id
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
function getPharmacistProfile(pharmacist) {
  const deferred = Q.defer();
  const pharmacistID = pharmacist._id;
  pharmacistsController.getPharmacist(pharmacistID)
        .then((resultPharmacist) => {
          deferred.resolve(resultPharmacist);
        }, (error) => {
          deferred.reject(error);
        });
  return deferred.promise;
}
function editPharmacistProfile(pharmacist, data) {
  const deferred = Q.defer();
  const pharmacistID = pharmacist._id;
  const json = {};
  if ('first_name' in data) { json.first_name = data.first_name; }
  if ('last_name' in data) { json.last_name = data.last_name; }
  if ('phone_number' in data) { json.phone_number = data.phone_number; }
  if ('email_address' in data) { json.email_address = data.email_address; }
  if ('time_zone' in data) { json.time_zone = data.time_zone; }
  pharmacistsController.updatePharmacist(pharmacistID, json)
        .then((resultPharmacist) => {
          deferred.resolve(resultPharmacist);
        }, (error) => {
          deferred.reject(error);
        });
  if ('email_address' in data) {
    const username = data.email_address;
    const body = {
      username
    };
    const filter = {
      'user_type.item': pharmacistID
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
function listNotifications(pharmacist, query) {
  const pharmacistID = pharmacist._id;
  const filter = {
    resource: pharmacistID,
  };
  return notificationsController.getAllNotifications(filter, query);
}
function updateNotification(pharmacist, notificationID, body) {
  const data = {};
  if (('status' in body) && body.status !== '' && body.status !== undefined) { data.status = body.status; }
  data.updated_at = Date.now();
  return notificationsController.updateNotification(notificationID, data);
}
function updateNotifications(pharmacist, body) {
  const query = { 'resource.item': pharmacist._id };
  return notificationsController.updateNotificationByFilter(query, body);
}
function deleteNotifications(pharmacist) {
  const query = { 'resource.item': pharmacist._id };
  return notificationsController.deleteNotificationByFilter(query);
}

exports.default = {
  getCallLogsStatistics,
  getDischargesCount,
  resetPassword,
  getPharmacistProfile,
  listNotifications,
  updateNotification,
  updateNotifications,
  deleteNotifications,
  editPharmacistProfile
};
module.exports = exports.default;
