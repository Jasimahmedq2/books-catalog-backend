import { Schema, model } from 'mongoose';
import { IReadStatus, IUser } from './user.interfaces';

const IReadStatusConstant: IReadStatus[] = [
  'reading',
  'plan to read',
  'finished read',
];

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    wishList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'book',
          unique: true,
        },
      ],
      default: [],
    },
    readingList: {
      type: [
        {
          book: {
            type: Schema.Types.ObjectId,
            ref: 'book',
            required: true,
            unique: true,
          },
          readStatus: {
            type: String,
            enum: IReadStatusConstant,
            default: 'plan to read',
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// Create and export the User model
const User = model<IUser>('user', UserSchema);

export default User;
