import { PostModel, UserModel } from 'models';
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

  const listPost = await PostModel.find(queryParams);
  const listUserId = listPost?.map((post) => UserModel.findOne({ _id: post?.user }));
  const listUser = await Promise.all(listUserId);
  const posts = listPost?.map((post: any) => {
    return {
      id: post?._id,
      user: listUser?.find((user) => user?._id.toString() === post?.user.toString()),
      title: post?.title,
      content: post?.content,
      active: post?.active,
      status: post?.status,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
  });

  return posts;
};

const getPostsByUserId = async (request: any) => {
  const { id } = request.params;
  const { page, page_size } = request.query;
  const queryParams: any = { user: id, status: 'ACCEPTED', active: true };

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    PostModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    PostModel.find(queryParams).skip(skip).limit(limit).sort({"updatedAt": -1}),
  ]);

  return {
    total: count,
    skip,
    data: listPost,
  };
};

const getPost = async (request: any) => {
  const { id } = request.params;

  const post = await PostModel.findOne({ _id: id, status: 'ACCEPTED' });

  return post;
};

const getPosts = async (request: any) => {
  const { page, page_size, search } = request.query;
  // const { id } = request.params;
  const queryParams: any = { status: 'ACCEPTED', active: true };

  if (search) {
    queryParams.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listPost] = await Promise.all([
    PostModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    PostModel.find(queryParams).skip(skip).limit(limit).sort({"updatedAt": -1}),
  ]);

  const listUserId = listPost?.map((post) => UserModel.findOne({ _id: post?.user }));
  const listUser = await Promise.all(listUserId);

  return {
    total: count,
    skip,
    data: listUser,
  };
};

const createPost = async (post: House) => {
  const result = await PostModel.create(post);
  return result;
};

const updatePost = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await PostModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deletePost = async (request: any) => {
  const { id } = request.params;
  const data = await PostModel.findOneAndUpdate({ _id: id }, { active: false });
  await Promise.all([]);
  return data;
};

export { getPostsByStatus, getPostsByUserId, getPost, getPosts, createPost, updatePost, deletePost };
