import jwt from 'jsonwebtoken';
import config from 'config';
import { UserModel } from 'models';
import { AuthDto, ChangePasswordDto, RefreshDto } from './dtos';
import { UserNotFound, ForbiddenException, UserNotAuthorizedException, UserExisted } from 'exceptions';
import { decrypt, encrypt } from 'utils/aes';
import { User } from 'models/user';
import { DEFAULT_EXPIRE_TIME } from 'utils/constants';

const login = async (user: AuthDto) => {
  const { phone, password } = user;
  const data = await UserModel.findOne({ phone, active: true });

  if (data) {
    const passwordDeCrypt = decrypt(data.password);

    if (password === passwordDeCrypt) {
      const result = {
        accessToken: jwt.sign(data.toJSON(), config.jwtAccessSecretKey, { expiresIn: '1d' }),
        refreshToken: jwt.sign(data.toJSON(), config.jwtRefreshSecretKey),
        expires: DEFAULT_EXPIRE_TIME,
      };

      return result;
    }
  }

  throw new UserNotFound();
};

const register = async (user: User) => {
  const { phone, password } = user;
  const checkPhone = await UserModel.findOne({ phone: phone, active: true });

  if (checkPhone) {
    throw new UserExisted();
  }

  const newPassword = encrypt(password);
  const result = await UserModel.create({
    ...user,
    password: newPassword,
  });

  return result;
};

const refresh = async (data: RefreshDto) => {
  const refreshToken = data.refreshToken;

  if (!refreshToken) {
    throw new UserNotAuthorizedException();
  }

  const result = jwt.verify(data.refreshToken, config.jwtRefreshSecretKey, (err, res) => {
    if (err) {
      throw new ForbiddenException();
    }

    const newToken = {
      accessToken: jwt.sign(res, config.jwtAccessSecretKey, { expiresIn: '23h' }),
      refreshToken: jwt.sign(res, config.jwtRefreshSecretKey),
      expires: DEFAULT_EXPIRE_TIME,
    };

    return newToken;
  });

  return result;
};

const changePassword = async (data: ChangePasswordDto) => {
  const { id, password, newPassword } = data;
  const userSearch = await UserModel.findOne({ _id: id });
  const oldPassword = decrypt(userSearch.password);

  if (oldPassword === password) {
    const newPass = encrypt(newPassword);
    const user = UserModel.findOneAndUpdate({ _id: id }, { password: newPass });
    return user;
  }

  throw new UserNotFound();
};

export { login, register, refresh, changePassword };
