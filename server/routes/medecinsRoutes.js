/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getAllMedecins,
  getMedecin,
  addMedecin,
  updateMedecin,
} from '../controllers/medecinsController.js';

const router = express.Router();

router.get('/', (req, res) => {
  const filter = req.query;
  getAllMedecins(filter, {})
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getMedecin(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const comment = req.body;
  if ('_id' in comment) {
    updateMedecin(comment._id, comment)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addMedecin(comment)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const data = { deleted: true };
  updateMedecin(id, data)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

