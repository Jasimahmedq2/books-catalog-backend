import { Types } from 'mongoose';

export type IReadStatus = 'reading' | 'plan to read' | 'finished read';

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  role: string;
  password: string;
  email: string;
  wishList: Types.ObjectId[];
  readingList: {
    book: Types.ObjectId;
    readStatus: IReadStatus;
  }[];
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
