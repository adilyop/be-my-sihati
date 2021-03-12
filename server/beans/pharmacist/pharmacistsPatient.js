
const events = require('events');
const patientsController = require('../../controllers/patientsController');
const usersController = require('../../controllers/usersController');

const pharmacistsPatientEmitter = new events.EventEmitter();

function getAllPatients(pharmacist, data) {
  const filter = {};
  return patientsController.getAllPatients(filter, data);
}
function searchPatients(pharmacist, filter, pagination) {
  return patientsController.searchPatients(filter, pagination);
}
function updatePatient(pharmacist, patientID, patient) {
  return new Promise((resolve, reject) => {
    if (patientID) {
      patientsController.updatePatient(patientID, patient)
        .then((resPatient) => {
          resolve(resPatient);
        }, (err) => {
          reject(err);
        });
      if ('email_address' in patient) {
        const username = patient.email_address;
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
    } else { reject({}); }
  });
}

exports.default = {
  getAllPatients,
  searchPatients,
  updatePatient,
  pharmacistsPatientEmitter
};
module.exports = exports.default;
