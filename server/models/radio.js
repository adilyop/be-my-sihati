/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const radiosSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, refPath: 'patients' },
  ordonnance: { type: Schema.Types.ObjectId, refPath: 'ordonnances' },
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  radio_name: String,
  laboratory: String,
  date_prevu: String,
  date_rdv: String,
  date_prise_rdv: { type: Date, default: Date.now },
  price: String,
  interpretation_medecin: String,
  interpretation_labo: String,
  comment: String,
  result_interpretation: String,
  result_conclusion: String,
  deleted: { type: Boolean, default: false },
  radio_status: { type: String, default: 'Later', enum: ['Done', 'Later', 'InProgress'] },
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
}, { collection: 'radios' });

export default mongoose.model('radios', radiosSchema);
