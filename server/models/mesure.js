/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const mesuresSchema = new Schema({
  type: String, // 0 1s
  benificiaire: { type: Schema.Types.ObjectId, ref: 'benificiaires' },
  date: String,
  time: String,
  value: String,
  comment: String,
  comment_pro: String,
  deleted: { type: Boolean, default: false },
}, { collection: 'mesures' });

export default mongoose.model('mesures', mesuresSchema);
