import mongoose from 'mongoose';
import config from './config';
import app from './app';

const port = 5000 || config.port;

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_connect as string);
    app.listen(port, () => {
      console.log(`successfully connected the server on port${port}`);
    });
  } catch (error) {
    console.log('db not connected');
  }
};

connectDB();
