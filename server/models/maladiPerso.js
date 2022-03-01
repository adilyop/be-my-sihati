/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const maladiPerso = new Schema({
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  category: String,
  name: String,
  date_start: String,
  date_end: String,
  stade: String,
  date_remission: String,
  consequences: String,
  traitement: String,
  traitement_status: String,
  traitement_date_start: String,
  traitement_date_end: String,
  traitement_drugs: String,
  result_biology: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
  result_radio: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
  comments: String,
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
  deleted: { type: Boolean, default: false },
}, { collection: 'maladiPersos' });

export default mongoose.model('maladiPersos', maladiPerso);
