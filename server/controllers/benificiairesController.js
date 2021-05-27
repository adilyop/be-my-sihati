/**
 * Created by adil on 18/08/17.
 */
import { Benificiaires, Consultations, Analyses, Radios } from '../models/index.js';

function addBenificiaire(data) {
  const benificiaire = new Benificiaires(data);
  const filter = { _id: benificiaire._id };
  return Benificiaires.findOneAndUpdate(filter, benificiaire, { new: true, upsert: true })
    .populate('user.item')
    .exec();
}

function getBenificiaire(_id, patient) {
  const filter = { _id, patient };
  return Benificiaires.find(filter);
}
function getNotifications(benificiaire, patient) {
  const filter = { patient, benificiaire, consultation_status: 'Later' };
  const filterAnalyse = { patient, benificiaire, analyse_status: 'Later' };
  const filterRadio = { patient, benificiaire, radio_status: 'Later' };
  console.log(' filter ', filter)
  return Consultations.find(filter).then((consultations) => {
    return Analyses.find(filterAnalyse).then((analyses) => {
      return Radios.find(filterRadio).then((radios) => {
        const result = {
          countConsultation: consultations.length,
          countAnalyse: analyses.length,
          countRadio: radios.length,
        };
        return result;
      });
    });
  });
}

function getBenificiaireByFilter(filter, pagination) {
  let skip = 0;
  let limit = 20;
  if (pagination !== undefined && 'skip' in pagination && pagination.skip !== undefined) skip = parseInt(pagination.skip, 10);
  if (pagination !== undefined && 'limit' in pagination && pagination.limit !== undefined) limit = parseInt(pagination.limit, 10);
  if (limit > 100) limit = 100;
  return Benificiaires.find(filter)
    .populate('user.item')
    .skip(skip)
    .limit(limit)
    .exec();
}

function updateBenificiaire(id, body) {
  const update = { $set: body };
  const filter = { _id: id };
  return Benificiaires.findOneAndUpdate(filter, update)
    .exec();
}

function deleteBenificiaire(id) {
  return Benificiaires.findByIdAndRemove(id)
    .exec();
}

export {
  addBenificiaire,
  getBenificiaire,
  getBenificiaireByFilter,
  updateBenificiaire,
  deleteBenificiaire,
  getNotifications
};
