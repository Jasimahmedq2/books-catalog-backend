import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { bookRoutes } from '../modules/books/books.route';
const router = express.Router();

const rootRoutes = [
  {
    path: '/users',
    element: userRoutes,
  },
  {
    path: '/books',
    element: bookRoutes,
  },
];

rootRoutes.forEach(route => router.use(route.path, route.element));
export const mainRoutes = router;
