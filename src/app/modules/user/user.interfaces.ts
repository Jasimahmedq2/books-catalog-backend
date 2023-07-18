import { Types } from 'mongoose';

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  role: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ILoginResponse = {
  accessToken: string;
  user: {
    userId: Types.ObjectId;
    email: string;
  };
};
