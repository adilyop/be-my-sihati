/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const patientsSchema = new Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  dob: String,
  email_address: String,
  ssn: String,
  discharge_status: { type: String, default: 'NotScheduled', enum: ['Scheduled', 'NotScheduled'] },
  patient_number: Number,
  deleted: { type: Boolean, default: false },
}, { collection: 'patients' });

export default mongoose.model('patients', patientsSchema);
