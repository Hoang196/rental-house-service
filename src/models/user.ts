import { model, Model, Schema, Document } from 'mongoose';

export const userSchema = new Schema(
  {
    phone: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, default: '' },
    address: { type: String, default: '' },
    role: { type: String, default: 'USER' },
    avatar: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface User extends Document {
  phone: string;
  password: string;
  username?: string;
  address?: string;
  role?: string;
  avatar?: string;
  active?: boolean;
}

const UserModel: Model<User> = model<User>('users', userSchema);

export default UserModel;
