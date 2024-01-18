import { UserExisted } from 'exceptions';
import { FavouriteModel } from 'models';
import { Favourite } from 'models/favourite';
import { DEFAULT_PAGING } from 'utils/constants';

const getFavourites = async (request: any) => {
  const { page, page_size, search } = request.query;
  const { id } = request.params;
  const queryParams: any = {
    user: id,
  };

  if (search) {
    queryParams.$or = [{ name: { $regex: search, $options: 'i' } }];
  }

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, favourite] = await Promise.all([
    FavouriteModel.count(queryParams),
    FavouriteModel.find(queryParams).skip(skip).limit(limit),
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
  const { id } = request.params;
  const { active } = request.body;
  const favourite = await FavouriteModel.findOneAndUpdate({ _id: id }, { active: active });
  return favourite;
};

export { getFavourites, createFavourite, updateFavourite, deleteFavourite };
