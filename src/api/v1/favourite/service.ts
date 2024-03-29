import { UserExisted } from 'exceptions';
import { FavouriteModel, HouseModel } from 'models';
import { Favourite } from 'models/favourite';
import { DEFAULT_PAGING } from 'utils/constants';

const getFavouriteByUserId = async (request: any) => {
  const { page, page_size } = request.query;
  const { _id } = request.user;
  const queryParams: any = {
    user: _id,
    active: true,
  };

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, favourite] = await Promise.all([
    FavouriteModel.count(queryParams),
    FavouriteModel.find(queryParams).skip(skip).limit(limit).populate('user').populate('house'),
  ]);

  return {
    total: count,
    skip,
    data: favourite,
  };
};

const getFavourites = async (request: any) => {
  const { page, page_size } = request.query;
  const queryParams: any = {
    active: true,
  };

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, favourite] = await Promise.all([
    FavouriteModel.count(queryParams),
    FavouriteModel.find(queryParams).skip(skip).limit(limit).populate('user').populate('house'),
  ]);

  return {
    total: count,
    skip,
    data: favourite,
  };
};

const createFavourite = async (fa: Favourite) => {
  const { user, house } = fa;
  const checkExisted = await FavouriteModel.findOne({ user, house, active: true });

  if (checkExisted) {
    throw new UserExisted();
  }

  const houseDetail = await HouseModel.findOne({ id: house });
  await HouseModel.findOneAndUpdate({ _id: house }, { like: houseDetail.like + 1 });
  const result = await FavouriteModel.create(fa);
  return result;
};

const updateFavourite = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await FavouriteModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteFavourite = async (request: any) => {
  const user = request.user;
  const { id } = request.params;
  const favouriteDetail = await FavouriteModel.findOne({ user: user._id, house: id, active: true });
  const houseDetail = await HouseModel.findOne({ _id: id });
  await HouseModel.findOneAndUpdate({ _id: id }, { like: houseDetail.like - 1 });
  const favourite = await FavouriteModel.deleteOne({ _id: favouriteDetail?._id });
  return favourite;
};

export { getFavouriteByUserId, getFavourites, createFavourite, updateFavourite, deleteFavourite };
