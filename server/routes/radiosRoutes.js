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
    if (!fs.existsSync('../patient/' + benificiaire + '/radio')) {
      fs.mkdirSync('../patient/' + benificiaire + '/radio');
    }
    cb(null, '../patient/' + benificiaire + '/radio/');
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
  getRadioByFilter(patient, benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  const patientId = ObjectId(req.query.patient);
  getRadio(_id, patientId)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/benif/:id', (req, res) => {
  const patient = req.query.patient;
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
router.post('/:radioId/benif/:id/upload/:name', upload.single('file'), (request, res) => {
  const benificiaire = request.params.id;
  const name = request.params.name;
  const radioId = request.params.radioId;
  const attachement = {
    name,
    mimeType: request.file.mimetype,
    path: `patient/${benificiaire}/radio/${name}`,
  };
  addFile(attachement).then((fileResult) => {
    updateRadio(radioId, { attachements: [fileResult._id] })
    .then(response => res.send(response), error => res.send(error));
  });
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

