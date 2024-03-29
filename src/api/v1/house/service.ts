import { map } from 'lodash';
import { FavouriteModel, HouseModel } from 'models';
import { House } from 'models/house';
import { DEFAULT_PAGING } from 'utils/constants';

const getPostsByStatus = async (query: any) => {
  const { status, page, page_size } = query;
  const queryParams: any = {
    status,
  };

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    HouseModel.count(queryParams),
    HouseModel.find(queryParams).skip(skip).limit(limit).populate('user').populate('category'),
  ]);

  return {
    total: count,
    skip,
    data: listPost,
  };
};

const getPostsByUserId = async (request: any) => {
  const { _id } = request.user;
  const { page, page_size, status } = request.query;
  const queryParams: any = { user: _id, status };

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    HouseModel.count(queryParams),
    HouseModel.find(queryParams).skip(skip).limit(limit).populate('user').populate('category'),
  ]);

  return {
    total: count,
    skip,
    data: listPost,
  };
};

const getPost = async (request: any) => {
  const { id } = request.params;

  const post = await HouseModel.findOne({ _id: id }).populate('user').populate('category');

  return post;
};

const getPosts = async (request: any) => {
  const { page, page_size, search } = request.query;
  const queryParams: any = {
    status: 'ACCEPT',
    active: true,
  };

  if (search) {
    queryParams.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { address: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    HouseModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    HouseModel.find(queryParams).skip(skip).limit(limit).populate('user').populate('category').sort({"createdAt": -1}),
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
  const data = await Promise.all(promises);
  const promisesFavourites = map(listId, (id) => FavouriteModel.findOneAndUpdate({ house: id }, { active: false }));
  await Promise.all(promisesFavourites);
  return data;
};

const deletePost = async (request: any) => {
  const { id } = request.params;
  const data = await HouseModel.deleteOne({ _id: id });
  return data;
};

export { getPostsByStatus, getPostsByUserId, getPost, getPosts, createPost, updatePost, updateStatusPost, deletePost };
