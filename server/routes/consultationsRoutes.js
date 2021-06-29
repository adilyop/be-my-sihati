/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getConsultationByFilter,
  getConsultation,
  addConsultation,
  updateConsultation,
  deleteConsultation
} from '../controllers/consultationsController.js';
import {
  addFile
} from '../controllers/filesController.js';
import mongoose from 'mongoose';
import fs from 'fs';

const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

router.get('/benif/:id', (req, res) => {
  const benif = ObjectId(req.params.id);
  const patient = req.user._id;
  getConsultationByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.user._id);
  getConsultation(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.user._id;
  const benificiaire = req.params.id;
  const consultation = req.body;
  consultation.benificiaire = benificiaire;
  consultation.patient = patient;
  if ('_id' in consultation) {
    updateConsultation(consultation._id, consultation)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addConsultation(consultation)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:id', (req, res) => {
  const consultation = req.body;
  const id = req.params.id;
  updateConsultation(id, consultation)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteConsultation(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/:consultationId/benif/:id/upload/:name', (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const consultationId = request.params.consultationId;
  const chunks = [];
  if (!fs.existsSync('../patient')) {
    fs.mkdirSync('../patient');
  }
  if (!fs.existsSync('../patient/' + benificiaire)) {
    fs.mkdirSync('../patient/' + benificiaire);
  }
  if (!fs.existsSync('../patient/' + benificiaire + '/consultation')) {
    fs.mkdirSync('../patient/' + benificiaire + '/consultation');
  }
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', (a, z, e) => {
    const data = Buffer.concat(chunks);
    fs.writeFile(`../patient/${benificiaire}/consultation/${name}`, data, 'binary', function(err){});
  })
  const attachement = {
    name,
    path: `patient/${benificiaire}/consultation/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateConsultation(consultationId, { attachements: [fileResult._id] });
  });
  // uploadFile(patient, benificiaire, analyseId)
  //   .then(response => res.send(response), error => res.send(error));
});
export default router;

