/**
 * Created by adil on 18/08/17.
 */
import { MaladiOthers } from '../models/index.js';

function addMaladiOther(data) {
  delete data._id;
  const maladiOther = new MaladiOthers(data);
  const filter = { _id: maladiOther._id };
  return MaladiOthers.findOneAndUpdate(filter, maladiOther, { new: true, upsert: true })
    .exec();
}

function getMaladiOther(_id, patient) {
  const filter = { _id, patient };
  return MaladiOthers.find(filter);
}

function getMaladiOtherByFilter(benificiaire) {
  const filter = { benificiaire, deleted: false };
  return MaladiOthers.find(filter)
    .populate({
      path: 'attachements',
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

function updateMaladiOther(_id, body) {
  const update = { $set: body };

  console.log('update ', update)
  return MaladiOthers.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteMaladiOther(_id) {
  const update = { $set: { deleted: true } };
  return MaladiOthers.findOneAndUpdate({ _id }, update)
    .exec();
}

export {
  addMaladiOther,
  getMaladiOther,
  getMaladiOtherByFilter,
  updateMaladiOther,
  deleteMaladiOther
};
