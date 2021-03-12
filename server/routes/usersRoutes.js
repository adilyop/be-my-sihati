/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  addUser,
  deleteUser
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', (req, res) => {
  getAllUsers({}, {})
    .then(response => res.send(response), error => res.send(error));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getUser(id)
    .then(response => res.send(response), error => res.send(error));
});
router.post('/', (req, res) => {
  console.log('req.body  ', req.body)
  const user = req.body;
  if ('_id' in user) {
    updateUser(user._id, user)
      .then(response => res.send(response), error => res.send(error));
  } else {
    addUser(user)
      .then(response => res.send(response), error => res.send(error));
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteUser(id)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

