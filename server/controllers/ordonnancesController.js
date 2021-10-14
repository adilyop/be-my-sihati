/**
 * Created by adil on 18/08/17.
 */
import { Ordonnances } from '../models/index.js';
import fs from 'fs';

function addOrdonnance(data) {
  const ordonnance = new Ordonnances(data);
  const filter = { _id: ordonnance._id };
  return Ordonnances.findOneAndUpdate(filter, ordonnance, { new: true, upsert: true })
    .exec();
}

function getOrdonnance(_id, patient) {
  const filter = { _id, patient };
  return Ordonnances.find(filter);
}

function getOrdonnanceByFilter(patient, benificiaire) {
  const filter = { patient, benificiaire, deleted: false };
  return Ordonnances.find(filter)
  // .populate({
  //   path: 'consultation',
  //   model: 'consultations'
  // })
  .populate({
    path: 'attachements',
    select: 'id name path mimeType',
    model: 'files',
  })
  .populate({
    path: 'consultation',
    model: 'consultations',
    populate: {
      path: 'medecin',
      model: 'medecins',
    }
  })
  .exec();
}

function updateOrdonnance(_id, body) {
  const update = { $set: body };
  return Ordonnances.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteOrdonnance(_id) {
  const update = { $set: { deleted: true } };
  return Ordonnances.findOneAndUpdate({ _id }, update)
    .exec();
}
function uploadFile(patient, benificiaire, ordonnanceId) {
  fs.writeFile("test.txt", b,  "binary",function(err) { });
}

export {
  addOrdonnance,
  getOrdonnance,
  getOrdonnanceByFilter,
  updateOrdonnance,
  deleteOrdonnance,
  uploadFile
};
