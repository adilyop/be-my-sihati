/**
 * Created by adil on 18/08/17.
 */
import { Consultations } from '../models/index.js';

function addConsultation(data) {
  const consultation = new Consultations(data);
  const filter = { _id: consultation._id };
  return Consultations.findOneAndUpdate(filter, consultation, { new: true, upsert: true })
    .exec();
}

function getConsultation(_id, patient) {
  const filter = { _id, patient };
  return Consultations.find(filter);
}

function getConsultationByFilter(patient, benificiaire) {
  const filter = { patient, benificiaire, deleted: false };
  return Consultations.find(filter)
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

function updateConsultation(_id, body) {
  const update = { $set: body };
  return Consultations.findOneAndUpdate({ _id }, update)
    .exec();
}

function deleteConsultation(_id) {
  const update = { $set: { deleted: true } };
  return Consultations.findOneAndUpdate({ _id }, update)
    .exec();
}

export {
  addConsultation,
  getConsultation,
  getConsultationByFilter,
  updateConsultation,
  deleteConsultation
};
