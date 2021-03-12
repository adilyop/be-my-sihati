import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubFacilitiesSchema = new Schema({
  doctor_name: String,
  contact_first_name: String,
  contact_last_name: String,
  doctor_phone_number: String,
  email_address: String,
  street_address: String,
  city_address: String,
  state_address: String,
  zip_address: String,
  deleted: { type: Boolean, default: false },
}, { collection: 'subFacilities' });

export default mongoose.model('subFacilities', SubFacilitiesSchema);
