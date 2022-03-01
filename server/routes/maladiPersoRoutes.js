/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getMaladiPersoByFilter,
  getMaladiPerso,
  updateMaladiPerso,
  addMaladiPerso,
  deleteMaladiPerso
} from '../controllers/maladiPersoController.js';
import {
  addFile
} from '../controllers/filesController.js';

import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';

const ObjectId = mongoose.Types.ObjectId;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const benificiaire = req.params.id;
    if (!fs.existsSync('../patient')) {
      fs.mkdirSync('../patient');
    }
    if (!fs.existsSync('../patient/' + benificiaire)) {
      fs.mkdirSync('../patient/' + benificiaire);
    }
    if (!fs.existsSync('../patient/' + benificiaire + '/maladie personnelle')) {
      fs.mkdirSync('../patient/' + benificiaire + '/maladie personnelle');
    }
    cb(null, '../patient/' + benificiaire + '/maladie personnelle/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/benif/:benifID', (req, res) => {
  const benifID = req.params.benifID;
  getMaladiPersoByFilter(benifID)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getMaladiPerso(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const maladiPerso = req.body;
  if (maladiPerso._id) {
    updateMaladiPerso(maladiPerso._id, maladiPerso)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addMaladiPerso(maladiPerso)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteMaladiPerso(id)
    .then(response => res.send(response), error => res.send(error));
});

router.post('/:maladId/benif/:id/upload/:name', upload.single('file'), (request, res) => {
  if (request.file) {
    const benificiaire = request.params.id;
    const name = request.params.name;
    const maladId = request.params.maladId;
    const attachement = {
      name,
      mimeType: request.file.mimetype,
      path: `patient/${benificiaire}/maladie personnelle/${name}`,
    };
    addFile(attachement).then((fileResult) => {
      updateMaladiPerso(maladId, { attachements: [fileResult._id] })
      .then(response => res.send(response), error => res.send(error));
    });
  }
});
router.post('/:maladId/benif/:id/upload-radio/:name', upload.single('file'), (request, res) => {
  if (request.file) {
    const benificiaire = request.params.id;
    const name = request.params.name;
    const maladId = request.params.maladId;
    const attachement = {
      name,
      mimeType: request.file.mimetype,
      path: `patient/${benificiaire}/maladie personnelle/${name}`,
    };
    addFile(attachement).then((fileResult) => {
      updateMaladiPerso(maladId, { result_radio: [fileResult._id] })
      .then(response => res.send(response), error => res.send(error));
    });
  }
});
router.post('/:maladId/benif/:id/upload-bio/:name', upload.single('file'), (request, res) => {
  if (request.file) {
    const benificiaire = request.params.id;
    const name = request.params.name;
    const maladId = request.params.maladId;
    const attachement = {
      name,
      mimeType: request.file.mimetype,
      path: `patient/${benificiaire}/maladie personnelle/${name}`,
    };
    addFile(attachement).then((fileResult) => {
      updateMaladiPerso(maladId, { result_biology: [fileResult._id] })
      .then(response => res.send(response), error => res.send(error));
    });
  }
});
export default router;

