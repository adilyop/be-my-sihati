/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getBenificiaireByFilter,
  getBenificiaire,
  addBenificiaire,
  updateBenificiaire,
  deleteBenificiaire,
  getNotifications
} from '../controllers/benificiairesController.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

router.get('/', (req, res) => {
  getBenificiaireByFilter({ patient: req.query.patient, deleted: false }, {})
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.query.patient);
  getBenificiaire(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id/notifications', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.query.patient);
  getNotifications(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const patient = req.query.patient;
  const benificiaire = req.body;
  benificiaire.patient = patient;
  if ('_id' in benificiaire) {
    updateBenificiaire(benificiaire._id, benificiaire)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addBenificiaire(benificiaire)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:id', (req, res) => {
  const benificiaire = req.body;
  const id = req.params.id;
  updateBenificiaire(id, benificiaire)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteBenificiaire(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

