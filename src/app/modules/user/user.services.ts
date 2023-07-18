import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../Helpers/jwtHelpers';
import config from '../../../config';
import ApiError from '../../../errors/apiError';
import { ILoginResponse, IUser } from './user.interfaces';
import User from './user.model';
import bcrypt from 'bcrypt';

const registerUser = async (payload: IUser): Promise<IUser> => {
  payload.role = 'user';
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<ILoginResponse> => {
  const { email, password } = payload;
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    throw new ApiError(404, "user doesn't exist");
  }
  const isPasswordMatched = await bcrypt.compare(password, userExist.password);
  if (!isPasswordMatched) {
    throw new ApiError(401, "password doesn't matched");
  }

  const accessToken = jwtHelpers.createToken(
    {
      userId: userExist._id,
      email: userExist.email,
      role: userExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expireIn as string
  );
  return {
    accessToken: accessToken,
    user: {
      userId: userExist?._id,
      email: userExist?.email,
    },
  };
};

export const userServices = {
  registerUser,
  loginUser,
};
