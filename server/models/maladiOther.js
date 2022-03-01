/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const maladiOther = new Schema({
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  family_link: String,
  name_person: String,
  category: String,
  name: String,
  date_start: String,
  date_end: String,
  stade: String,
  consequences: String,
  traitement: String,
  traitement_status: String,
  traitement_date_start: String,
  traitement_date_end: String,
  comments: String,
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
  deleted: { type: Boolean, default: false },
}, { collection: 'maladiOthers' });

export default mongoose.model('maladiOthers', maladiOther);
