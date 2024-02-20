import { filter, includes, map } from 'lodash';
import { CategoryModel, FavouriteModel, HouseModel, UserModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';

const getDataSearch = async (request: any) => {
  const { money_from, money_to, district, province, square_from, square_to, category, type, page, page_size } =
    request.query;
  const queryParams: any = {
    active: true,
  };

  if (type) {
    queryParams.type = type;
  }

  if (district) {
    queryParams.district = district;
  }

  if (province) {
    queryParams.province = province;
  }

  if (money_to) {
    queryParams.money = { $gte: money_from, $lte: money_to };
  }

  if (square_to) {
    queryParams.square = { $gte: square_from, $lte: square_to };
  }

  if (category) {
    queryParams.category = category;
  }

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, listHouses] = await Promise.all([
    HouseModel.count(queryParams),
    HouseModel.find(queryParams).skip(skip).limit(limit).populate('user').populate('category'),
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
    HouseModel.find({ active: true }).sort({ like: -1 }).skip(skip).limit(limit).populate('user').populate('category'),
  ]);

  return {
    total: count,
    skip,
    data: listHouses,
  };
};

const getArrayRandom = () => {
  let arrayRandom: number[] = [];
  let index = 12;

  for (let i = 0; i < 8; i++) {
    const number = Math.floor(Math.random() * 10) + 2;

    if (includes(arrayRandom, number)) {
      arrayRandom.push(index);
      index++;
    } else {
      arrayRandom.push(number);
    }
  }

  return arrayRandom;
};

const checkUserLikePost = async (request: any) => {
  const user = request.user;
  const { house } = request.query;
  const checkExisted = await FavouriteModel.findOne({ user: user._id, house, active: true });

  return !!checkExisted;
};

const getRandomHouse = async (request: any) => {
  const { type } = request.query;
  const arrayRandom = getArrayRandom();
  const promises = map(arrayRandom, (item) =>
    HouseModel.find({ type, active: true }).skip(item).limit(1).populate('user').populate('category')
  );
  const data = await Promise.all(promises);
  const result = filter(
    map(data, (item) => {
      return item?.[0] || {};
    }),
    (item2: any) => item2?._id
  );
  return result;
};

const getStatistics = async (request: any) => {
  const [
    userCount,
    houseRent,
    housePair,
    housePending,
    houseAccept,
    houseReject,
    houseTrue,
    houseFalse,
    houseHN,
    houseDN,
    houseHCM,
    categoryCount,
  ] = await Promise.all([
    UserModel.count(),
    HouseModel.count({ type: 'RENT' }),
    HouseModel.count({ type: 'PAIR' }),
    HouseModel.count({ status: 'PENDING' }),
    HouseModel.count({ status: 'ACCEPT' }),
    HouseModel.count({ status: 'REJECT' }),
    HouseModel.count({ active: true }),
    HouseModel.count({ active: false }),
    HouseModel.count({ province: 1 }),
    HouseModel.count({ province: 48 }),
    HouseModel.count({ province: 79 }),
    CategoryModel.count(),
  ]);

  return {
    userCount: userCount || 0,
    houseRent: houseRent || 0,
    housePair: housePair || 0,
    housePending: housePending || 0,
    houseAccept: houseAccept || 0,
    houseReject: houseReject || 0,
    houseTrue: houseTrue || 0,
    houseFalse: houseFalse || 0,
    houseHN: houseHN || 0,
    houseDN: houseDN || 0,
    houseHCM: houseHCM || 0,
    categoryCount: categoryCount || 0,
  };
};

export { getDataSearch, getTopFavourite, checkUserLikePost, getRandomHouse, getStatistics };
