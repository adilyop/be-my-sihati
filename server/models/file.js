/* eslint-disable new-cap, no-param-reassign */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const filesSchema = new Schema({
  name: String,
  path: String,
}, { collection: 'files' });

export default mongoose.model('files', filesSchema);
