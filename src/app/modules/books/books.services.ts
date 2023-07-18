import { Types } from 'mongoose';
import { IBook, IBookQuery } from './books.interfaces';
import Book from './books.model';
import ApiError from '../../../errors/apiError';

const createBook = async (payload: IBook) => {
  const result = await Book.create(payload);
  return result;
};
const getBooks = async (queryData: IBookQuery): Promise<IBook[] | null> => {
  const { searchQuery, genreFilter, publishedYearFilter } = queryData;
  const query: any = {};

  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { author: { $regex: searchQuery, $options: 'i' } },
    ];
  }

  if (genreFilter) {
    query.genre = { $regex: new RegExp(genreFilter, 'i') };
  }

  if (publishedYearFilter) {
    query.publishedDate = publishedYearFilter;
  }

  const result = await Book.find(query);
  return result;
};

const editBook = async (id: string, payload: IBook) => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).populate('reviews.user');
  console.log(result)
  return result;
};
const getAllBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find({}).sort({ createdAt: -1 });
  return result;
};

const createReview = async (
  userId: Types.ObjectId,
  bookId: string,
  text: string
): Promise<IBook> => {
  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    throw new ApiError(404, "book doesn't exist");
  }

  const newComment = {
    user: userId,
    text: text,
  };

  book?.reviews.push(newComment);

  const result = await book.save();

  return result;
};

export const BookServices = {
  createBook,
  editBook,
  deleteBook,
  getBooks,
  getAllBooks,
  getSingleBook,
  createReview,
};
