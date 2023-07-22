import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './books.interfaces';
import { BookServices } from './books.services';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookInfo } = req.body;
  const result = await BookServices.createBook(bookInfo);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a book',
    data: result,
  });
});
const getBooks = catchAsync(async (req: Request, res: Response) => {
  const { ...queryData } = req.query;
  console.log({ serviceQueryparams: queryData });

  const result = await BookServices.getBooks(queryData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a book',
    data: result,
  });
});

const editBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...bookInfo } = req.body;
  const result = await BookServices.editBook(id, bookInfo);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully edited the book',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.deleteBook(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully deleted the book',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.getSingleBook(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get the book',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.getAllBooks();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully retrieve all book',
    data: result,
  });
});

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { bookId } = req.params;
  const { text } = req.body;
  console.log({ textHere: text });
  const result = await BookServices.createReview(userId, bookId, text);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a review',
    data: result,
  });
});

export const BookControllers = {
  createBook,
  editBook,
  deleteBook,
  getBooks,
  getAllBooks,
  getSingleBook,
  createReview,
};
