/**
 * Created by adil on 18/08/17.
 */
import { Radios } from '../models/index.js';
import fs from 'fs';

function addRadio(data) {
  const radio = new Radios(data);
  const filter = { _id: radio._id };
  return Radios.findOneAndUpdate(filter, radio, { new: true, upsert: true })
    .exec();
}

function getRadio(_id, patient) {
  const filter = { _id, patient };
  return Radios.find(filter);
}

function getRadioByFilter(patient, benificiaire) {
  const filter = { patient, benificiaire };
  return Radios.find(filter)
  // .populate({
  //   path: 'consultation',
  //   model: 'consultations'
  // })
  .populate({
    path: 'attachements',
    model: 'files',
  })
  .populate({
    path: 'ordonnance',
    model: 'ordonnances',
    populate: {
      path: 'consultation',
      model: 'consultations',
      populate: {
        path: 'medecin',
        model: 'medecins',
      }
    }
  })
  .exec();
}

function updateRadio(_id, body) {
  const update = { $set: body };
  return Radios.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteRadio(id) {
  return Radios.findByIdAndRemove(id)
    .exec();
}
function uploadFile(patient, benificiaire, radioId) {
  fs.writeFile("test.txt", b,  "binary",function(err) { });
}

export {
  addRadio,
  getRadio,
  getRadioByFilter,
  updateRadio,
  deleteRadio,
  uploadFile
};
