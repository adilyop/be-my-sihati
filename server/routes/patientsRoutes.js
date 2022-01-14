/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  updateUserByFilter,
} from '../controllers/usersController.js';
import {
  getAllPatients,
  getPatient,
  addPatient,
  updatePatient,
} from '../controllers/patientsController.js';

const router = express.Router();

router.get('/', (req, res) => {
  getAllPatients({}, {})
    .then(response => res.send(response), error => res.send(error));
});
router.get('/filter', (req, res) => {
  const filter = req.query;
  getAllPatients(filter, {})
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getPatient(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const patient = req.body;
  if ('_id' in patient) {
    updatePatient(patient._id, patient)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addPatient(patient)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const data = { deleted: true };
  const filter = { 'user_type.item': id };
  updateUserByFilter(filter, data);
  updatePatient(id, data)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

