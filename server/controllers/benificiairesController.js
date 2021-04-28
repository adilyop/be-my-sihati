/**
 * Created by adil on 18/08/17.
 */
import { Benificiaires } from '../models/index.js';

function addBenificiaire(data) {
  const benificiaire = new Benificiaires(data);
  const filter = { _id: benificiaire._id };
  return Benificiaires.findOneAndUpdate(filter, benificiaire, { new: true, upsert: true })
    .populate('user.item')
    .exec();
}

function getBenificiaire(_id, patient) {
  const filter = { _id, patient };
  console.log(' filter ', filter)
  return Benificiaires.find(filter);
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
  deleteBenificiaire
};
