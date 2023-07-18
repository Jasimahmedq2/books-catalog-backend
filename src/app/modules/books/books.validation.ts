import { z } from 'zod';
const createBookZodSchema = z.object({
  body: z.object({
    image: z.string({
      required_error: 'book image is required',
    }),
    author: z.string({ required_error: 'author is required' }),
    genre: z.string({ required_error: 'select a genre' }),
    publishedDate: z.string({ required_error: 'published date is required' }),
    title: z.string({ required_error: 'title  is required' }),
  }),
});
const editBookZodSchema = z.object({
  body: z.object({
    author: z.string({ required_error: 'author is required' }).optional(),
    genre: z.string({ required_error: 'select a genre' }).optional(),
    publishedDate: z
      .string({ required_error: 'published date is required' })
      .optional(),
    title: z.string({ required_error: 'title  is required' }).optional(),
  }),
});

export const BookZodSchema = {
  createBookZodSchema,
  editBookZodSchema,
};
