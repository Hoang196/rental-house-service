import { UserNotFound } from 'exceptions';
import { map } from 'lodash';
import { HouseModel, UserModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';

const getMe = async (user: any) => {
  const { _id: id } = user || {};

  if (id) {
    const data = await UserModel.findOne({ _id: id, active: true });

    const minMaxSquareData = await Promise.allSettled([
      HouseModel.find({ active: true }).sort({ square: 1 }).limit(1),
      HouseModel.find({ active: true }).sort({ square: -1 }).limit(1),
    ]);

    const minMaxMoneyData = await Promise.allSettled([
      HouseModel.find({ active: true }).sort({ money: 1 }).limit(1),
      HouseModel.find({ active: true }).sort({ money: -1 }).limit(1),
    ]);

    const minMaxSquareValue = map(minMaxSquareData, (item: any) => item?.value?.[0]?.square);
    const minMaxMoneyValue = map(minMaxMoneyData, (item: any) => item?.value?.[0]?.money);

    return {
      user: data,
      minSquare: minMaxSquareValue?.[0],
      maxSquare: minMaxSquareValue?.[1],
      minMoney: minMaxMoneyValue?.[0],
      maxMoney: minMaxMoneyValue?.[1],
    };
  }

  throw new UserNotFound();
};

const getUser = async (params: any) => {
  const { id } = params;

  if (id) {
    const data = await UserModel.findOne({ _id: id, active: true });
    return data;
  }

  throw new UserNotFound();
};

const getUsers = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ username: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } }];
  }

  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;
  const [count, users] = await Promise.all([
    UserModel.count(queryParams),
    UserModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: users,
  };
};

const updateUser = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await UserModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteUser = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const user = await UserModel.findOneAndUpdate({ _id: id }, { active: active });
  await Promise.all([HouseModel.updateMany({ user: id }, { active: active })]);
  return user;
};

export { getUser, getUsers, updateUser, deleteUser, getMe };
