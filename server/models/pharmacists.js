import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pharmacistsSchema = new Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  email_address: String,
  time_zone: Object,
  send_email: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
}, { collection: 'pharmacists' });

export default mongoose.model('pharmacists', pharmacistsSchema);
