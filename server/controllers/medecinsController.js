/**
 * Created by adil on 03/01/17.
 */
/* eslint-disable new-cap, no-param-reassign */

import phone from 'phone';
import { Medecins } from '../models/index.js';
import Q from 'q';

function getAllMedecins(filter) {
  const search = filter;
  console.log('search ', search)
  return Medecins.find(filter).exec();
}
function getMedecin(id) {
  const deferred = Q.defer();
  Medecins.findById(id, (err, medecin) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(medecin);
    }
  });
  return deferred.promise;
}
function addMedecin(data) {
  const deferred = Q.defer();
  const newMedecin = new Medecins(data);
  newMedecin.save((err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
function updateMedecin(medecinID, body) {
  const deferred = Q.defer();
  const query = {
    _id: medecinID
  };
  Medecins.findOneAndUpdate(query, body, { new: true }, (err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
function updateMedecinByFilter(filter, body) {
  return new Promise((resolve, reject) => {
    if ('phone_number' in body && phone(body.phone_number).length !== 0) {
      body.phone_number = phone(body.phone_number)[0];
    }
    Medecins.update(filter, body, { new: true, multi: true }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function deleteMedecin(id) {
  const deferred = Q.defer();
  const query = {
    _id: id
  };
  const body = {
    deleted: true
  };
  Medecins.findOneAndUpdate(query, body, { new: true }, (err, result) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}

export {
  getAllMedecins,
  getMedecin,
  addMedecin,
  updateMedecin,
  updateMedecinByFilter,
  deleteMedecin
};
