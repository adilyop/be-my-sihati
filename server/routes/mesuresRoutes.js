/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import mongoose from 'mongoose';
import {
  getMesureByFilter,
  getMesure,
  addMesure,
  updateMesure,
  deleteMesure
} from '../controllers/mesuresController.js';

const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

router.get('/benif/:id', (req, res) => {
  const benif = ObjectId(req.params.id);
  getMesureByFilter(benif)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const _id = ObjectId(req.params.id);
  getMesure(_id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const mesure = req.body;
  if ('_id' in mesure && mesure._id) {
    updateMesure(mesure._id, mesure)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addMesure(mesure)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.post('/:id', (req, res) => {
  const mesure = req.body;
  const id = req.params.id;
  updateMesure(id, mesure)
    .then(response => res.send(response), error => res.send(error));
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteMesure(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

