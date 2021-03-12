/**
 * Created by adil on 7/5/17.
 */
import { getLongTermCareFacility } from '../controllers/longTermCareFacilitiesController';
import { getQueue } from '../controllers/queuesController';
import { getPatient } from '../controllers/patientsController';

function loadLTC(req, res, next, id) {
  getLongTermCareFacility(id)
    .then((ltc) => {
      // eslint-disable-next-line no-param-reassign
      req.ltc = ltc;
      return next();
    })
    .catch(error => next(error));
}
function loadQueue(req, res, next, id) {
  getQueue(id)
      .then((queue) => {
        // eslint-disable-next-line no-param-reassign
        req.queue = queue;
        return next();
      })
      .catch(error => next(error));
}
function loadPatient(req, res, next, id) {
  getPatient(id)
      .then((patient) => {
        // eslint-disable-next-line no-param-reassign
        req.patient = patient;
        return next();
      })
      .catch(error => next(error));
}

export default {
  loadLTC,
  loadQueue,
  loadPatient,
};
