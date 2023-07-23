import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userZodSchema } from './user.validation';
import { userControllers } from './user.controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/register',
  validateRequest(userZodSchema.registerUserZodSchema),
  userControllers.registerUser
);

router.post(
  '/login',
  validateRequest(userZodSchema.logInUserZodSchema),
  userControllers.loginUser
);

router.get('/get-user', auth("user"), userControllers.getUser)
// wishlist & read list

router.get('/get-wishlist', auth('user'), userControllers.getBookWishlist);

router.get(
  '/get-readingList',
  auth('user'),
  userControllers.getBookReadingList
);
router.patch(
  '/update-readingStatus/:bookId',
  auth('user'),
  userControllers.updateReadingStatus
);

router.post('/wishlist/:bookId', auth('user'), userControllers.bookWishlist);
router.post('/readingList/:bookId', auth('user'), userControllers.bookReadList);

export const userRoutes = router;
