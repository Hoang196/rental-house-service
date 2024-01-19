import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';
import { Category } from './category';

export const houseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User', index: true },
    category: { type: Schema.Types.ObjectId, require: true, ref: 'Category', index: true },
    title: { type: String, require: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true, index: true },
    square: { type: Number, required: true, index: true },
    money: { type: Object, required: true, index: true },
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
  image: string;
  address: string;
  square: number;
  money: Object;
  contact: string;
  type: string;
  like?: number;
  status?: string;
  active?: boolean;
}

const HouseModel: Model<House> = model<House>('houses', houseSchema);

export default HouseModel;
