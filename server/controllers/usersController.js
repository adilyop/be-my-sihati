/**
 * Created by adil on 03/01/17.
 */
/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';
import { Users } from '../models/index.js';

const ObjectId = mongoose.Types.ObjectId;
import Q from 'q';

function getAllUsers(filter, pagination) {
  const deferred = Q.defer();
  let skip = 0;
  let limit = 10;
  if (pagination !== undefined && 'skip' in pagination && !isNaN(pagination.skip)) { skip = Number(pagination.skip); }
  if (pagination !== undefined && 'limit' in pagination && !isNaN(pagination.skip)) { limit = Number(pagination.limit); }
  if ('sub_facility_id' in filter) { filter.sub_facility_id = ObjectId(filter.sub_facility_id); }
  if ('pharmacist_id' in filter) { filter.pharmacist_id = ObjectId(filter.pharmacist_id); }
  if ('patient_id' in filter) { filter.patient_id = ObjectId(filter.patient_id); }
  if ('call_log' in filter) { filter.call_log = ObjectId(filter.call_log); }
  filter.deleted = false;
  Users.aggregate(
    [
      {
        $match: filter,
      },
      {
        $group: {
          _id: null,
          docs: { $push: '$$ROOT' },
          count: { $sum: 1 }
        }
      },
      { $project: { _id: 0, count: 1, docs: { $slice: ['$docs', skip, limit] } } }
    ], (err, userDocs) => {
    if (err) { deferred.reject(err); } else if (userDocs.length === 0) {
      deferred.resolve({ docs: [], count: 0 });
    } else {
      userDocs = userDocs[0];
      const users = userDocs.docs;
      const totalCount = userDocs.count;
      deferred.resolve({ docs: users, count: totalCount });
    }
  });
  return deferred.promise;
}
function getUserByFilter(filter) {
  const deferred = Q.defer();
  let cursor = Users.find(filter);
  cursor = cursor.populate('user_type.item');
  cursor.exec((err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
function getUser(id) {
  return Users.findById(id)
  .populate('user_type.item');
}
function addUser(data) {
  console.log('data ', data)
  const user = new Users(data);
  const _id = user._id;
  return Users.findOneAndUpdate({ _id }, user, { new: true, upsert: true })
    .populate('user_type.item')
    .exec();
}
function updateUser(userID, body) {
  const query = {
    _id: userID
  };
  return Users.findOneAndUpdate(query, body, { new: true })
  .populate('user_type.item')
  .exec();
}
function updateUserByFilter(query, body) {
  return new Promise((resolve, reject) => {
    Users.update(query, body, { new: true, multi: true }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function deleteUser(id) {
  const deferred = Q.defer();
  const query = {
    _id: id
  };
  const body = {
    deleted: true
  };
  Users.findOneAndUpdate(query, body, { new: true }, (err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
function deleteUserByFilter(filter) {
  const body = {
    deleted: true
  };
  return new Promise((resolve, reject) => {
    Users.update(filter, body, { new: true, multi: true }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export {
  getAllUsers,
  getUserByFilter,
  getUser,
  addUser,
  updateUser,
  updateUserByFilter,
  deleteUser,
  deleteUserByFilter
};
