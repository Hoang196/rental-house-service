import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';

export const chatSchema = new Schema(
  {
    userSend: { type: Schema.Types.ObjectId, require: true, ref: 'User', index: true },
    userReceive: { type: Schema.Types.ObjectId, require: true, ref: 'User', index: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Chat extends Document {
  userSend: User;
  userReceive: User;
  content: string;
  type: string;
  active?: boolean;
}

const ChatModel: Model<Chat> = model<Chat>('chat', chatSchema);

export default ChatModel;
