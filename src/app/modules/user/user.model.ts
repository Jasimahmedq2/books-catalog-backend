import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interfaces';

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
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create and export the User model
const User = model<IUser>('user', UserSchema);

export default User;
