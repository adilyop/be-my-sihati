/**
 * Created by adil on 03/01/17.
 */
/* eslint-disable new-cap, no-param-reassign */

import phone from 'phone';
import { Pharmacists } from '../models/index.js';
import Q from 'q';

function getAllPharmacists(filter, pagination) {
  const deferred = Q.defer();
  const search = {};
  let skip = 0;
  let limit = 10;
  if (pagination !== undefined && 'skip' in pagination && !isNaN(pagination.skip)) { skip = Number(pagination.skip); }
  if (pagination !== undefined && 'limit' in pagination && !isNaN(pagination.skip)) { limit = Number(pagination.limit); }
  if (('first_name' in filter) && filter.first_name !== '' && filter.first_name !== undefined) { search.first_name = new RegExp(filter.first_name, 'i'); }
  if (('last_name' in filter) && filter.last_name !== '' && filter.last_name !== undefined) { search.last_name = new RegExp(filter.last_name, 'i'); }
  if (('phone_number' in filter) && filter.phone_number !== '' && filter.phone_number !== undefined) { search.phone_number = new RegExp(filter.phone_number, 'i'); }
  if (('email_address' in filter) && filter.email_address !== '' && filter.email_address !== undefined) { search.email_address = new RegExp(filter.email_address, 'i'); }
  if (('send_email' in filter) && filter.send_email !== '' && filter.send_email !== undefined) { search.send_email = filter.send_email; }
  search.deleted = false;
  Pharmacists.aggregate(
    [
      {
        $match: search,
      },
      {
        $group: {
          _id: null,
          docs: { $push: '$$ROOT' },
          count: { $sum: 1 }
        }
      },
            { $project: { _id: 0, count: 1, docs: { $slice: ['$docs', skip, limit] } } }
    ], (err, pharmacistDocs) => {
    if (err) { deferred.reject(err); } else if (pharmacistDocs.length === 0) {
      deferred.resolve({ docs: [], count: 0 });
    } else {
      pharmacistDocs = pharmacistDocs[0];
      const pharmacists = pharmacistDocs.docs;
      const totalCount = pharmacistDocs.count;
      deferred.resolve({ docs: pharmacists, count: totalCount });
    }
  });
  return deferred.promise;
}
function getPharmacist(id) {
  const deferred = Q.defer();
  Pharmacists.findById(id, (err, pharmacist) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(pharmacist);
    }
  });
  return deferred.promise;
}
function addPharmacist(data) {
  const deferred = Q.defer();
  if ('phone_number' in data && phone(data.phone_number).length !== 0) {
    data.phone_number = phone(data.phone_number)[0];
  }
  const newPharmacist = new Pharmacists(data);
  newPharmacist.save((err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
function updatePharmacist(pharmacistID, body) {
  const deferred = Q.defer();
  if ('phone_number' in body && phone(body.phone_number).length !== 0) {
    body.phone_number = phone(body.phone_number)[0];
  }
  const query = {
    _id: pharmacistID
  };
  Pharmacists.findOneAndUpdate(query, body, { new: true }, (err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
function updatePharmacistByFilter(filter, body) {
  return new Promise((resolve, reject) => {
    if ('phone_number' in body && phone(body.phone_number).length !== 0) {
      body.phone_number = phone(body.phone_number)[0];
    }
    Pharmacists.update(filter, body, { new: true, multi: true }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function deletePharmacist(id) {
  const deferred = Q.defer();
  const query = {
    _id: id
  };
  const body = {
    deleted: true
  };
  Pharmacists.findOneAndUpdate(query, body, { new: true }, (err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}

export {
  getAllPharmacists,
  getPharmacist,
  addPharmacist,
  updatePharmacist,
  updatePharmacistByFilter,
  deletePharmacist
};
