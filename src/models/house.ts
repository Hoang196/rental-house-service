import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';
import { Category } from './category';

export const houseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    category: { type: Schema.Types.ObjectId, require: true, ref: 'Category' },
    title: { type: String, require: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    square: { type: String, required: true },
    money: { type: Object, required: true },
    contact: { type: String, required: true },
    type: { type: String, required: true },
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
  square: string;
  money: Object;
  contact: string;
  type: string;
  status?: string;
  active?: boolean;
}

const HouseModel: Model<House> = model<House>('houses', houseSchema);

export default HouseModel;
