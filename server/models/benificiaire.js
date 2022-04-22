/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;
const benificiairesSchema = new Schema({
  uuid: { type: String, default: `MA-${uuid.v4().substring(0, 13)}` },
  patient: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  first_name: String,
  last_name: String,
  phone_number: String,
  birth_date: String,
  family_link: String,
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
  groupe_sanguin: String,
  start_date_my_doctor: String,
  end_date_my_doctor: String,
  discharge_status: { type: String, default: 'NotScheduled', enum: ['Scheduled', 'NotScheduled'] },
  patient_number: Number,
  urgent_contact: { type: Object, default: [{}, {}, {}] },
  medecin: { type: Schema.Types.ObjectId, refPath: 'medecins' },
  deleted: { type: Boolean, default: false },
}, { collection: 'benificiaires' });

export default mongoose.model('benificiaires', benificiairesSchema);
