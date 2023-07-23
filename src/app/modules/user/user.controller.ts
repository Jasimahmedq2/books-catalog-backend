/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interfaces';
import { userServices } from './user.services';
import { Types } from 'mongoose';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { ...registerInfo } = req.body;
  const result = await userServices.registerUser(registerInfo);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully create a user',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...registerInfo } = req.body;
  const result = await userServices.loginUser(registerInfo);
  const { accessToken, user } = result;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully login the user',
    data: {
      accessToken,
      user,
    },
  });
});

// wishlist & readList

const getBookWishlist = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const result = await userServices.getBookWishlist(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully retrieve all books',
    data: result,
  });
});
const getBookReadingList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const result = await userServices.getBookReadingList(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully retrieve all readingList books',
    data: result,
  });
});

const bookWishlist = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { bookId } = req.params;
  const convertId = new Types.ObjectId(bookId);
  const result = await userServices.bookWishlist(userId, convertId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully added book into the wishlist',
    data: result,
  });
});
const bookReadList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { bookId } = req.params;
  const convertId = new Types.ObjectId(bookId);

  const { readStatus } = req.body;
  const result = await userServices.bookReadList(userId, convertId, readStatus);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully added book into the readList',
    data: result,
  });
});
const updateReadingStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { bookId } = req.params;
  const { readStatus } = req.body;
  const result = await userServices.updateReadingStatus(
    userId,
    bookId,
    readStatus
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully updated book reading status',
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const result = await userServices.getUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully retrieve a user',
    data: result,
  });
});

export const userControllers = {
  registerUser,
  loginUser,
  bookWishlist,
  bookReadList,
  getBookWishlist,
  getBookReadingList,
  updateReadingStatus,
  getUser,
};
