/**
 * Created by adil on 18/08/17.
 */
import { DocAdministratifs } from '../models/index.js';

function addDocAdministratif(data) {
  delete data._id;
  const docAdministratif = new DocAdministratifs(data);
  const filter = { _id: docAdministratif._id };
  return DocAdministratifs.findOneAndUpdate(filter, docAdministratif, { new: true, upsert: true })
    .exec();
}

function getDocAdministratif(_id, patient) {
  const filter = { _id, patient };
  return DocAdministratifs.find(filter);
}

function getDocAdministratifByFilter(benificiaire) {
  const filter = { benificiaire, deleted: false };
  return DocAdministratifs.find(filter)
    .populate({
      path: 'attachements',
      select: 'id name path mimeType',
      model: 'files',
    })
    .exec();
}

function updateDocAdministratif(_id, body) {
  const update = { $set: body };
  return DocAdministratifs.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteDocAdministratif(_id) {
  const update = { $set: { deleted: true } };
  return DocAdministratifs.findOneAndUpdate({ _id }, update)
    .exec();
}

export {
  addDocAdministratif,
  getDocAdministratif,
  getDocAdministratifByFilter,
  updateDocAdministratif,
  deleteDocAdministratif
};
