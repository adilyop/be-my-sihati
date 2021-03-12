/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getAllPharmacists,
  getPharmacist,
  addPharmacist,
  updatePharmacist,
} from '../controllers/pharmacistsController.js';
import {
  updateUserByFilter,
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', (req, res) => {
  const skip = req.query.skip;
  const limit = req.query.limit;
  const pagination = {
    skip,
    limit
  };
  const filter = { deleted: false };
  getAllPharmacists(filter, pagination)
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getPharmacist(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const pharmacist = req.body;
  if ('_id' in pharmacist) {
    updatePharmacist(pharmacist._id, pharmacist)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addPharmacist(pharmacist)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const data = { deleted: true };
  const filter = { 'user_type.item': id };
  updateUserByFilter(filter, data);
  updatePharmacist(id, data)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

