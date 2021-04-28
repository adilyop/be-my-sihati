/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const medecinsSchema = new Schema({
  speciality: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  birth_date: String,
  sex: String,
  adresse: String,
  commune: String,
  departement: String,
  region: String,
  country: String,
  fax: String,
  CIN: String,
  comment: String,
  cell_phone: String,
  email_address: String,
  ssn: String,
  discharge_status: { type: String, default: 'NotScheduled', enum: ['Scheduled', 'NotScheduled'] },
  patient_number: Number,
  deleted: { type: Boolean, default: false },
}, { collection: 'medecins' });

export default mongoose.model('medecins', medecinsSchema);
