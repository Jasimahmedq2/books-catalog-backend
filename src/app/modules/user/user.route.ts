import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userZodSchema } from './user.validation';
import { userControllers } from './user.controller';
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

export const userRoutes = router;
