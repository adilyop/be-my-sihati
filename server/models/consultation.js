/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const consultationsSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'patients' },
  benificiaire: { type: Schema.Types.ObjectId, ref: 'benificiaires' },
  medecin: { type: Schema.Types.ObjectId, ref: 'medecins' },
  consultation_status: { type: String, default: 'Later', enum: ['Done', 'Later', 'InProgress'] },
  consultation_name: String,
  consultation_desc: String,
  consultation_maladie: String,
  date_consultation: String,
  date_prise_rdv: { type: Date, default: Date.now },
  date_rdv: String,
  time_rdv: String,
  date_prevu: String,
  price: String,
  commentaire: String,
  commentaire_medecin: String,
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
  discharge_status: { type: String, default: 'NotScheduled', enum: ['Scheduled', 'NotScheduled'] },
  deleted: { type: Boolean, default: false },
}, { collection: 'consultations' });

export default mongoose.model('consultations', consultationsSchema);
