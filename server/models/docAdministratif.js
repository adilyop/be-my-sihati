/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const docAdministratif = new Schema({
  benificiaire: { type: Schema.Types.ObjectId, refPath: 'benificiaires' },
  name: String,
  date: String,
  time: String,
  date_start_validity: String,
  date_end_validity: String,
  comment: String,
  attachements: [{ type: Schema.Types.ObjectId, refPath: 'files' }],
  deleted: { type: Boolean, default: false },
}, { collection: 'docAdministratif' });

export default mongoose.model('docAdministratif', docAdministratif);
