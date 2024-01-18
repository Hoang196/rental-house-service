import { ChatModel } from 'models';
import { Chat } from 'models/chat';
import { DEFAULT_PAGING } from 'utils/constants';

const getChats = async (request: any) => {
  const { page, page_size, search, userSend, userReceive } = request.query;
  const queryParams: any = {
    userSend,
    userReceive,
  };

  if (search) {
    queryParams.$or = [{ content: { $regex: search, $options: 'i' } }];
  }

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, chat] = await Promise.all([
    ChatModel.count(queryParams),
    ChatModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: chat,
  };
};

const createChat = async (fa: Chat) => {
  const result = await ChatModel.create(fa);
  return result;
};

const updateChat = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await ChatModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteChat = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const chat = await ChatModel.findOneAndUpdate({ _id: id }, { active: active });
  return chat;
};

export { getChats, createChat, updateChat, deleteChat };
