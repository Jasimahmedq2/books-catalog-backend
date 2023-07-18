import { Types } from 'mongoose';

export type IBook = {
  image: string;
  author: string;
  genre: string;
  publishedDate: Date;
  title: string;
  role: string;
  reviews: {
    user: Types.ObjectId;
    text: string;
  }[];
};

export type IBookQuery = {
  searchQuery?: string;
  genreFilter?: string;
  publishedYearFilter?: string;
};
