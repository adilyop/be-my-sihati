/**
 * Created by adil on 18/08/17.
 */
import { Files } from '../models/index.js';
import fs from 'fs';

function addFile(data) {
  const file = new Files(data);
  const filter = { _id: file._id };
  return Files.findOneAndUpdate(filter, file, { new: true, upsert: true })
    .exec();
}

function getFile(_id, patient) {
  const filter = { _id, patient };
  return Files.find(filter);
}
function downloadFile(file) {
  console.log('file  download ', file)
  
}

function updateFile(_id, body) {
  const update = { $set: body };
  return Files.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteFile(_id) {
  const update = { $set: { deleted: true } };
  return Files.findOneAndUpdate({ _id }, update)
    .exec();
}

export {
  addFile,
  getFile,
  updateFile,
  deleteFile,
  downloadFile
};
