/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getDocAdministratifByFilter,
  getDocAdministratif,
  updateDocAdministratif,
  addDocAdministratif,
  deleteDocAdministratif
} from '../controllers/docAdministratifController.js';
import {
  addFile
} from '../controllers/filesController.js';
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
    if (!fs.existsSync('../patient/' + benificiaire + '/doc Administratif')) {
      fs.mkdirSync('../patient/' + benificiaire + '/doc Administratif');
    }
    cb(null, '../patient/' + benificiaire + '/doc Administratif/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/benif/:benifID', (req, res) => {
  const benifID = req.params.benifID;
  getDocAdministratifByFilter(benifID)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getDocAdministratif(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const docAdministratif = req.body;
  if (docAdministratif._id) {
    updateDocAdministratif(docAdministratif._id, docAdministratif)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addDocAdministratif(docAdministratif)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteDocAdministratif(id)
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
      path: `patient/${benificiaire}/doc Administratif/${name}`,
    };
    addFile(attachement).then((fileResult) => {
      updateDocAdministratif(maladId, { attachements: [fileResult._id] })
        .then(response => res.send(response), error => res.send(error));
    });
  }
});
export default router;

