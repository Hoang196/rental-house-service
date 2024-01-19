import { CategoryModel, HouseModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';

const getDataSearch = async (request: any) => {
  const { money, address, square, category, type, page, page_size } = request.query;
  const queryParams: any = {};

  if (type) {
    queryParams.type = type;
  }

  if (address) {
    queryParams.address = address;
  }

  if (money) {
    queryParams.money = { $gte: money.from, $lte: money.to };
  }

  if (square) {
    queryParams.square = { $gte: square.from, $lte: square.to };
  }

  if (category) {
    const getCategory = await CategoryModel.findOne({ name: category });
    queryParams.category = getCategory.id;
  }

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listHouses] = await Promise.all([
    HouseModel.count(queryParams),
    HouseModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: listHouses,
  };
};

const getTopFavourite = async (request: any) => {
  const { page, page_size } = request.query;

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listHouses] = await Promise.all([
    HouseModel.count(),
    HouseModel.find().sort({ like: -1 }).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: listHouses,
  };
};

export { getDataSearch, getTopFavourite };
