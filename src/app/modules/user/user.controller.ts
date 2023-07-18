import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interfaces';
import { userServices } from './user.services';

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

export const userControllers = {
  registerUser,
  loginUser,
};
