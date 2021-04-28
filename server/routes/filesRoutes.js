/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import {
  downloadFile
} from '../controllers/filesController.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

router.post('/file/download', (req, res) => {
  const body = req.body;
  downloadFile(body)
    .then(response => res.send(response), error => res.send(error));
});

export default router;

