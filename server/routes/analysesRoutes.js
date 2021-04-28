/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getAnalyseByFilter,
  getAnalyse,
  addAnalyse,
  updateAnalyse,
  deleteAnalyse,
  uploadFile
} from '../controllers/analysesController.js';
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
  getAnalyseByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.user._id);
  getAnalyse(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.user._id;
  const benificiaire = req.params.id;
  const analyse = req.body;
  analyse.benificiaire = benificiaire;
  analyse.patient = patient;
  if ('_id' in analyse) {
    updateAnalyse(analyse._id, analyse)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addAnalyse(analyse)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:analyseId/benif/:id/upload/:name', (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const analyseId = request.params.analyseId;
  const chunks = [];
  if (!fs.existsSync('../patient')) {
    fs.mkdirSync('../patient');
  }
  if (!fs.existsSync('../patient/' + benificiaire)) {
    fs.mkdirSync('../patient/' + benificiaire);
  }
  if (!fs.existsSync('../patient/' + benificiaire + '/analyse')) {
    fs.mkdirSync('../patient/' + benificiaire + '/analyse');
  }
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', (a, z, e) => {
    const data = Buffer.concat(chunks);
    fs.writeFile(`../patient/${benificiaire}/analyse/${name}`, data, 'binary', function(err){});
  })
  const attachement = {
    name,
    path: `patient/${benificiaire}/analyse/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateAnalyse(analyseId, { attachements: [fileResult._id] });
  });
  // uploadFile(patient, benificiaire, analyseId)
  //   .then(response => res.send(response), error => res.send(error));
});
router.post('/:id', (req, res) => {
  const analyse = req.body;
  const id = req.params.id;
  updateAnalyse(id, analyse)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteAnalyse(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

