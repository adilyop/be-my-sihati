/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subTraitementSchema = new Schema({
  sub_traitement_name: String,
  sub_traitement_start_date: String,
  sub_traitement_end_date: String,
  sub_traitement_duration_passed: String,
  sub_traitement_duration_reste: String,
  sub_traitement_posologie: String,
  sub_traitement_time_per_day: String,
  sub_traitement_type: String,
  result: Object,
  traitement_status: { type: String, default: 'Later', enum: ['Done', 'Later', 'InProgress'] },
}, { collection: 'subTraitement' });

const traitementsSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, refPath: 'patients' },
  ordonnance: { type: Schema.Types.ObjectId, refPath: 'ordonnances' },
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  pathologie: String,
  traitement_name: String,
  start_date: String,
  end_date: String,
  traitement_duration: String,
  subTraitments: [subTraitementSchema],
  date_prise_rdv: { type: Date, default: new Date() },
  comment: String,
  comment_personnel_traitment: String,
  interpretation_dr: String,
  traitement_status: { type: String, default: 'Later', enum: ['Done', 'Later', 'InProgress'] },
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
}, { collection: 'traitements' });
export default mongoose.model('traitements', traitementsSchema);
