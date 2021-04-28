/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const analysesSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, refPath: 'patients' },
  ordonnance: { type: Schema.Types.ObjectId, refPath: 'ordonnances' },
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  analyse_name: String,
  laboratory: String,
  date_prevu: String,
  date_rdv: String,
  price: String,
  interpretation_medecin: String,
  interpretation_labo: String,
  comment: String,
  deleted: { type: Boolean, default: false },
  consultation_status: { type: String, default: 'Later', enum: ['Done', 'Later', 'InProgress'] },
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
}, { collection: 'analyses' });

export default mongoose.model('analyses', analysesSchema);
