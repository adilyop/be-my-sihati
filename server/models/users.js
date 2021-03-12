import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  user_type: {
    kind: {
      type: String,
      enum: ['patients', 'pharmacists']
    },
    item: { type: Schema.Types.ObjectId, refPath: 'user_type.kind' }
  },
  deleted: { type: Boolean, default: false },
  last_login: Date
}, { collection: 'users' });

export default mongoose.model('users', usersSchema);
