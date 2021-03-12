import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  user: {
    kind: {
      type: String,
      enum: ['patients', 'pharmacists', 'doctors']
    },
    item: { type: Schema.Types.ObjectId, refPath: 'user.kind' }
  },
  refreshToken: {
    type: String
  },
  deviceId: String,
}, { collection: 'clients' });

export default mongoose.model('clients', ClientSchema);
