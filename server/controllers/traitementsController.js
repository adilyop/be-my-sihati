import { Traitements } from '../models/index.js';
import fs from 'fs';

function addTraitement(data) {
  const traitement = new Traitements(data);
  const filter = { _id: traitement._id };
  return Traitements.findOneAndUpdate(filter, traitement, { new: true, upsert: true })
    .exec();
}

function getTraitement(_id, patient) {
  const filter = { _id, patient };
  return Traitements.find(filter);
}

function getTraitementByFilter(patient, benificiaire) {
  const filter = { patient, benificiaire };
  return Traitements.find(filter)
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

function updateTraitement(_id, body) {
  const update = { $set: body };
  return Traitements.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteTraitement(id) {
  return Traitements.findByIdAndRemove(id)
    .exec();
}
function uploadFile(patient, benificiaire, traitementId) {
  fs.writeFile("test.txt", b,  "binary",function(err) { });
}

export {
  addTraitement,
  getTraitement,
  getTraitementByFilter,
  updateTraitement,
  deleteTraitement,
  uploadFile
};
