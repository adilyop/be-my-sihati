/**
 * Created by adil on 18/08/17.
 */
import { Mesures } from '../models/index.js';

function addMesure(data) {
  const mesure = new Mesures(data);
  const filter = { _id: mesure._id };
  return Mesures.findOneAndUpdate(filter, mesure, { new: true, upsert: true })
    .exec();
}

function getMesure(_id) {
  const filter = { _id };
  return Mesures.find(filter);
}

function getMesureByFilter(benificiaire) {
  const filter = { benificiaire, deleted: false };
  return Mesures.find(filter)
    // .populate({
    //   path: 'consultation',
    //   model: 'consultations'
    // })
    .populate({
      path: 'attachements',
      select: 'id name path mimeType',
      model: 'files',
    })
    .exec();
}

function updateMesure(_id, body) {
  const update = { $set: body };
  return Mesures.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteMesure(_id) {
  const update = { $set: { deleted: true } };
  return Mesures.findOneAndUpdate({ _id }, update)
    .exec();
}

export {
  addMesure,
  getMesure,
  getMesureByFilter,
  updateMesure,
  deleteMesure
};
