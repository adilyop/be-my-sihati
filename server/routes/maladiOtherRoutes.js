/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getMaladiOtherByFilter,
  getMaladiOther,
  updateMaladiOther,
  addMaladiOther,
  deleteMaladiOther
} from '../controllers/maladiOtherController.js';
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
    if (!fs.existsSync('../patient/' + benificiaire + '/maladie familiale')) {
      fs.mkdirSync('../patient/' + benificiaire + '/maladie familiale');
    }
    cb(null, '../patient/' + benificiaire + '/maladie familiale/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/benif/:benifID', (req, res) => {
  const benifID = req.params.benifID;
  getMaladiOtherByFilter(benifID)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getMaladiOther(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const maladiOther = req.body;
  if (maladiOther._id) {
    updateMaladiOther(maladiOther._id, maladiOther)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addMaladiOther(maladiOther)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteMaladiOther(id)
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
      path: `patient/${benificiaire}/maladie familiale/${name}`,
    };
    addFile(attachement).then((fileResult) => {
      updateMaladiOther(maladId, { attachements: [fileResult._id] })
      .then(response => res.send(response), error => res.send(error));
    });
  }
});
export default router;

