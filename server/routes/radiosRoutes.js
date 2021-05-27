/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getRadioByFilter,
  getRadio,
  addRadio,
  updateRadio,
  deleteRadio,
  uploadFile
} from '../controllers/radiosController.js';
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
  getRadioByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.user._id);
  getRadio(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.user._id;
  const benificiaire = req.params.id;
  const radio = req.body;
  radio.benificiaire = benificiaire;
  radio.patient = patient;
  if ('_id' in radio) {
    updateRadio(radio._id, radio)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addRadio(radio)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:radioId/benif/:id/upload/:name', (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const radioId = request.params.radioId;
  const chunks = [];
  if (!fs.existsSync('../patient')) {
    fs.mkdirSync('../patient');
  }
  if (!fs.existsSync('../patient/' + benificiaire)) {
    fs.mkdirSync('../patient/' + benificiaire);
  }
  if (!fs.existsSync('../patient/' + benificiaire + '/radio')) {
    fs.mkdirSync('../patient/' + benificiaire + '/radio');
  }
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', (a, z, e) => {
    const data = Buffer.concat(chunks);
    fs.writeFile(`../patient/${benificiaire}/radio/${name}`, data, 'binary', function(err){});
  })
  const attachement = {
    name,
    path: `patient/${benificiaire}/radio/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateRadio(radioId, { attachements: [fileResult._id] });
  });
  // uploadFile(patient, benificiaire, radioId)
  //   .then(response => res.send(response), error => res.send(error));
});
router.post('/:id', (req, res) => {
  const radio = req.body;
  const id = req.params.id;
  updateRadio(id, radio)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteRadio(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

