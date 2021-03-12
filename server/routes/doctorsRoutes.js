/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  updateUserByFilter,
} from '../controllers/usersController';
import {
  getAllLongTermCareFacilities,
  getLongTermCareFacility,
  addLongTermCareFacility,
  updateLongTermCareFacility,
} from '../controllers/doctorsController';

const router = express.Router();

router.get('/', (req, res) => {
  const filter = { deleted: false };
  getAllLongTermCareFacilities(filter, {})
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getLongTermCareFacility(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  const comment = req.body;
  if ('_id' in comment) {
    updateLongTermCareFacility(comment._id, comment)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addLongTermCareFacility(comment)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const data = { deleted: true };
  const filter = { 'user_type.item': id };
  updateUserByFilter(filter, data);
  updateLongTermCareFacility(id, data)
    .then(response => res.send(response), error => res.send(error));
});

module.exports = router;

