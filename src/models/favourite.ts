import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';
import { House } from './house';

export const favouriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    house: { type: Schema.Types.ObjectId, require: true, ref: 'House' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Favourite extends Document {
  user: User;
  house: House;
  active?: boolean;
}

const FavouriteModel: Model<Favourite> = model<Favourite>('favourite', favouriteSchema);

export default FavouriteModel;
