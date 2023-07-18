import { Schema, model } from 'mongoose';
import { IBook } from './books.interfaces';

const bookSchema = new Schema<IBook>(
  {
    image: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    title: { type: String, required: true },
    role: {
      type: String,
      default: 'user',
    },
    reviews: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Book = model<IBook>('book', bookSchema);
export default Book;
