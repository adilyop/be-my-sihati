/**
 * Created by adil on 18/08/17.
 */
import { Clients } from '../models/index.js';

function addClient(data) {
  const client = new Clients(data);
  const filter = { _id: client._id };
  return Clients.findOneAndUpdate(filter, client, { new: true, upsert: true })
    .populate('user.item')
    .exec();
}

function getClient(id) {
  return Clients.findById(id)
    .exec();
}

function getClientByFilter(filter, pagination) {
  let skip = 0;
  let limit = 20;
  if (pagination !== undefined && 'skip' in pagination && pagination.skip !== undefined) skip = parseInt(pagination.skip, 10);
  if (pagination !== undefined && 'limit' in pagination && pagination.limit !== undefined) limit = parseInt(pagination.limit, 10);
  if (limit > 100) limit = 100;
  return Clients.find(filter)
    .populate('user.item')
    .skip(skip)
    .limit(limit)
    .exec();
}

function updateClient(filter, body) {
  const update = { $set: body };
  return Clients.findOneAndUpdate(filter, update)
    .exec();
}

function deleteClient(id) {
  return Clients.findByIdAndRemove(id)
    .exec();
}

export {
  addClient,
  getClient,
  getClientByFilter,
  updateClient,
  deleteClient
};
