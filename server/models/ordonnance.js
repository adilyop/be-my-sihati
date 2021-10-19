/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ordonnancesSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, refPath: 'patients' },
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  consultation: { type: Schema.Types.ObjectId, refPath: 'consultations' },
  ordonnance_name: String,
  date_rdv: String,
  price: String,
  comment_medecin: String,
  comment: String,
  discharge_status: { type: String, default: 'NotScheduled', enum: ['Scheduled', 'NotScheduled'] },
  patient_number: Number,
  deleted: { type: Boolean, default: false },
  ordonnance_status: { type: String, default: 'Later', enum: ['Done', 'Later', 'InProgress'] },
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
}, { collection: 'ordonnances' });

export default mongoose.model('ordonnances', ordonnancesSchema);
