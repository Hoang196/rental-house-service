import { map } from 'lodash';
import { HouseModel } from 'models';
import { House } from 'models/house';
import { DEFAULT_PAGING } from 'utils/constants';

const getPostsByStatus = async (query: any) => {
  const { search, status } = query;
  const queryParams: any = {
    status,
  };

  if (search) {
    queryParams.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
  }

  const listPost = await HouseModel.find(queryParams);

  return listPost;
};

const getPostsByUserId = async (request: any) => {
  const { id } = request.params;
  const { page, page_size } = request.query;
  const queryParams: any = { user: id };

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    HouseModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    HouseModel.find(queryParams).skip(skip).limit(limit).sort({"updatedAt": -1}),
  ]);

  return {
    total: count,
    skip,
    data: listPost,
  };
};

const getPost = async (request: any) => {
  const { id } = request.params;

  const post = await HouseModel.findOne({ _id: id });

  return post;
};

const getPosts = async (request: any) => {
  const { page, page_size, search } = request.query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    HouseModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    HouseModel.find(queryParams).skip(skip).limit(limit).sort({"updatedAt": -1}),
  ]);

  return {
    total: count,
    skip,
    data: listPost,
  };
};

const createPost = async (post: House, user: any) => {
  const result = await HouseModel.create({
    ...post,
    user: user._id,
  });
  return result;
};

const updatePost = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await HouseModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const updateStatusPost = async (request: any) => {
  const { listId, status } = request.body;
  const promises = map(listId, (id) => HouseModel.findOneAndUpdate({ _id: id }, { status }));
  const data = await Promise.allSettled(promises);
  return data;
};

const deletePost = async (request: any) => {
  const { id } = request.params;
  const data = await HouseModel.findOneAndUpdate({ _id: id }, { active: false });
  return data;
};

export { getPostsByStatus, getPostsByUserId, getPost, getPosts, createPost, updatePost, updateStatusPost, deletePost };
