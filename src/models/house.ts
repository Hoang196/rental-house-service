import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';
import { Category } from './category';

export const houseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'users', index: true },
    category: { type: Schema.Types.ObjectId, require: true, ref: 'categories', index: true },
    title: { type: String, require: true },
    description: { type: String, required: true },
    imgs: { type: Array, required: true },
    address: { type: String, required: true, index: true },
    district: { type: Number, required: true, index: true },
    province: { type: Number, required: true, index: true },
    square: { type: Number, required: true, index: true },
    money: { type: Number, required: true, index: true },
    contact: { type: String, required: true },
    type: { type: String, required: true, index: true },
    like: { type: Number, default: 0 },
    status: { type: String, default: 'PENDING' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface House extends Document {
  user: User;
  category: Category;
  title: string;
  description: string;
  imgs: string[];
  address: string;
  district: number;
  province: number;
  square: number;
  money: number;
  contact: string;
  type: string;
  like?: number;
  status?: string;
  active?: boolean;
}

const HouseModel: Model<House> = model<House>('houses', houseSchema);

export default HouseModel;
