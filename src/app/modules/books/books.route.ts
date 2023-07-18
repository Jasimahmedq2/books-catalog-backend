import express from 'express';
import { BookControllers } from './books.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookZodSchema } from './books.validation';
import auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookZodSchema.createBookZodSchema),
  BookControllers.createBook
);
router.get('/get-books', BookControllers.getBooks);
router.get('/get-allBooks', BookControllers.getAllBooks);
router.get('/get-book/:id', BookControllers.getSingleBook);
router.post('/book-review/:bookId', auth('user'), BookControllers.createReview);
router.patch(
  '/edit-book/:id',
  auth('user'),
  validateRequest(BookZodSchema.editBookZodSchema),
  BookControllers.editBook
);
router.delete('/delete-book/:id', BookControllers.deleteBook);

export const bookRoutes = router;
