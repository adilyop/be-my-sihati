/* eslint-disable new-cap, no-param-reassign */
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';


const router = express.Router();
const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};
router.post('/download', (req, res) => {
  const body = req.body;
  const pathFile = body.path;

  const path1 = path.join(fs.realpathSync('..'), pathFile);
  const base64str = base64Encode(path1);
  res.send(base64str);
});
function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
export default router;

