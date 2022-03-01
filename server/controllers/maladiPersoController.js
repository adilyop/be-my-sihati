/**
 * Created by adil on 18/08/17.
 */
import { MaladiPersos } from '../models/index.js';

function addMaladiPerso(data) {
  delete data._id;
  const maladiPerso = new MaladiPersos(data);
  const filter = { _id: maladiPerso._id };
  return MaladiPersos.findOneAndUpdate(filter, maladiPerso, { new: true, upsert: true })
    .exec();
}

function getMaladiPerso(_id, patient) {
  const filter = { _id, patient };
  return MaladiPersos.find(filter);
}

function getMaladiPersoByFilter(benificiaire) {
  const filter = { benificiaire, deleted: false };
  return MaladiPersos.find(filter)
    .populate({
      path: 'attachements',
      select: 'id name path mimeType',
      model: 'files',
    })
    .populate({
      path: 'result_biology',
      select: 'id name path mimeType',
      model: 'files',
    })
    .populate({
      path: 'result_radio',
      select: 'id name path mimeType',
      model: 'files',
    })
    .populate({
      path: 'medecin',
      select: 'id speciality first_name last_name phone_number',
      model: 'medecins'
    })
    .exec();
}

function updateMaladiPerso(_id, body) {
  const update = { $set: body };

  console.log('update ', update)
  return MaladiPersos.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteMaladiPerso(_id) {
  const update = { $set: { deleted: true } };
  return MaladiPersos.findOneAndUpdate({ _id }, update)
    .exec();
}

export {
  addMaladiPerso,
  getMaladiPerso,
  getMaladiPersoByFilter,
  updateMaladiPerso,
  deleteMaladiPerso
};
