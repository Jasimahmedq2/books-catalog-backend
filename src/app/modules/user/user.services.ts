import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../Helpers/jwtHelpers';
import config from '../../../config';
import ApiError from '../../../errors/apiError';
import { ILoginResponse, IReadStatus, IUser } from './user.interfaces';
import User from './user.model';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Type } from 'typescript';

const registerUser = async (payload: IUser): Promise<IUser> => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_hash_sold)
  );
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

const getBookWishlist = async (userId: Types.ObjectId) => {
  const user = await User.findOne({ _id: userId }, { wishList: 1 }).populate(
    'wishList'
  );
  return user;
};
const getBookReadingList = async (userId: Types.ObjectId) => {
  const user = await User.findOne({ _id: userId }, { readingList: 1 }).populate(
    'readingList.book'
  );
  return user;
};

const bookWishlist = async (userId: Types.ObjectId, bookId: Types.ObjectId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  const BookObjectId = new Types.ObjectId(bookId);

  if (user?.wishList.includes(BookObjectId)) {
    throw new ApiError(401, 'already added the book wishlist');
  }

  user.wishList.push(BookObjectId);
  const result = await user.save();
  return result;
};

const bookReadList = async (
  userId: Types.ObjectId,
  bookId: Types.ObjectId,
  readStatus: IReadStatus
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  const BookObjectId = new Types.ObjectId(bookId);

  const isBookExist = user.readingList.find(
    book => book.book.toString() === bookId.toString()
  );

  console.log({ isBookExist });

  if (isBookExist?.book.toString() === bookId.toString()) {
    throw new ApiError(401, 'the book already exist');
  }

  console.log({ isBookExist });

  const bookOptions = {
    book: BookObjectId,
    readStatus: readStatus,
  };

  user.readingList.push(bookOptions);
  const result = await user.save();
  return result;
};

const updateReadingStatus = async (
  userId: Types.ObjectId,
  bookId: string,
  readStatus: IReadStatus
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  const updatedData = user.readingList.filter(
    book => book.book._id.toString() === bookId.toString()
  );

  updatedData[0].readStatus = readStatus;

  const result = await user.save();
  return result;
};

const getUser = async (userId: Types.ObjectId) => {
  const result = await User.findOne({ _id: userId }, { password: 0 })
    .populate('wishList')
    .populate('readingList.book');
  return result;
};

export const userServices = {
  registerUser,
  loginUser,
  bookWishlist,
  bookReadList,
  getBookWishlist,
  getBookReadingList,
  updateReadingStatus,
  getUser,
};
