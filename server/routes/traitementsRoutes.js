/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getTraitementByFilter,
  getTraitement,
  addTraitement,
  updateTraitement,
  deleteTraitement,
} from '../controllers/traitementsController.js';
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
  getTraitementByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.user._id);
  getTraitement(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.user._id;
  const benificiaire = req.params.id;
  const traitement = req.body;
  traitement.benificiaire = benificiaire;
  traitement.patient = patient;
  if ('_id' in traitement) {
    updateTraitement(traitement._id, traitement)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addTraitement(traitement)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:traitementId/benif/:id/upload/:name', (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const traitementId = request.params.traitementId;
  const chunks = [];
  if (!fs.existsSync('../patient')) {
    fs.mkdirSync('../patient');
  }
  if (!fs.existsSync('../patient/' + benificiaire)) {
    fs.mkdirSync('../patient/' + benificiaire);
  }
  if (!fs.existsSync('../patient/' + benificiaire + '/traitement')) {
    fs.mkdirSync('../patient/' + benificiaire + '/traitement');
  }
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', (a, z, e) => {
    const data = Buffer.concat(chunks);
    fs.writeFile(`../patient/${benificiaire}/traitement/${name}`, data, 'binary', function(err){});
  })
  const attachement = {
    name,
    path: `patient/${benificiaire}/traitement/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateTraitement(traitementId, { attachements: [fileResult._id] });
  });
  // uploadFile(patient, benificiaire, traitementId)
  //   .then(response => res.send(response), error => res.send(error));
});
router.post('/:id', (req, res) => {
  const traitement = req.body;
  const id = req.params.id;
  updateTraitement(id, traitement)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteTraitement(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

