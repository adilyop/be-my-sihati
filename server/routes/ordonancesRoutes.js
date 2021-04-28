/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getOrdonnanceByFilter,
  getOrdonnance,
  addOrdonnance,
  updateOrdonnance,
  deleteOrdonnance,
  uploadFile
} from '../controllers/ordonnancesController.js';
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
  getOrdonnanceByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.user._id);
  getOrdonnance(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.user._id;
  const benificiaire = req.params.id;
  const ordonnance = req.body;
  ordonnance.benificiaire = benificiaire;
  ordonnance.patient = patient;
  if ('_id' in ordonnance) {
    updateOrdonnance(ordonnance._id, ordonnance)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addOrdonnance(ordonnance)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:ordonnanceId/benif/:id/upload/:name', (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const ordonnanceId = request.params.ordonnanceId;
  const chunks = [];
  if (!fs.existsSync('../patient')) {
    fs.mkdirSync('../patient');
  }
  if (!fs.existsSync('../patient/' + benificiaire)) {
    fs.mkdirSync('../patient/' + benificiaire);
  }
  if (!fs.existsSync('../patient/' + benificiaire + '/ordonnance')) {
    fs.mkdirSync('../patient/' + benificiaire + '/ordonnance');
  }
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', (a, z, e) => {
    const data = Buffer.concat(chunks);
    fs.writeFile(`../patient/${benificiaire}/ordonnance/${name}`, data, 'binary', function(err){});
  })
  const attachement = {
    name,
    path: `patient/${benificiaire}/ordonnance/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateOrdonnance(ordonnanceId, { attachements: [fileResult._id] });
  });
  // uploadFile(patient, benificiaire, ordonnanceId)
  //   .then(response => res.send(response), error => res.send(error));
});
router.post('/:id', (req, res) => {
  const ordonnance = req.body;
  const id = req.params.id;
  updateOrdonnance(id, ordonnance)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteOrdonnance(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

