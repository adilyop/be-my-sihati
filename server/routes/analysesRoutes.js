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
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const benificiaire = req.params.id;
    if (!fs.existsSync('../patient')) {
      fs.mkdirSync('../patient');
    }
    if (!fs.existsSync('../patient/' + benificiaire)) {
      fs.mkdirSync('../patient/' + benificiaire);
    }
    if (!fs.existsSync('../patient/' + benificiaire + '/analyse')) {
      fs.mkdirSync('../patient/' + benificiaire + '/analyse');
    }
    cb(null, '../patient/' + benificiaire + '/analyse/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

router.get('/benif/:id', (req, res) => {
  const benif = ObjectId(req.params.id);
  const patient = req.query.patient;
  getAnalyseByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.query.patient);
  getAnalyse(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.query.patient;
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
router.post('/:analyseId/benif/:id/upload/:name', upload.single('file'), (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const analyseId = request.params.analyseId;
  const attachement = {
    name,
    mimeType: request.file.mimetype,
    path: `patient/${benificiaire}/analyse/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateAnalyse(analyseId, { attachements: [fileResult._id] })
    .then(response => res.send(response), error => res.send(error));
  });
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

