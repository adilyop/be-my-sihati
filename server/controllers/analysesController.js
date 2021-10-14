/**
 * Created by adil on 18/08/17.
 */
import { Analyses } from '../models/index.js';
import fs from 'fs';

function addAnalyse(data) {
  const analyse = new Analyses(data);
  const filter = { _id: analyse._id };
  return Analyses.findOneAndUpdate(filter, analyse, { new: true, upsert: true })
    .exec();
}

function getAnalyse(_id, patient) {
  const filter = { _id, patient };
  return Analyses.find(filter);
}

function getAnalyseByFilter(patient, benificiaire) {
  const filter = { patient, benificiaire, deleted: false };
  return Analyses.find(filter)
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

function updateAnalyse(_id, body) {
  const update = { $set: body };
  return Analyses.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteAnalyse(_id) {
  const update = { $set: { deleted: true } };
  return Analyses.findOneAndUpdate({ _id }, update)
    .exec();
}
function uploadFile(patient, benificiaire, analyseId) {
  fs.writeFile("test.txt", b,  "binary",function(err) { });
}

export {
  addAnalyse,
  getAnalyse,
  getAnalyseByFilter,
  updateAnalyse,
  deleteAnalyse,
  uploadFile
};
