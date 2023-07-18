import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IErrorMessages } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IErrorMessages[] = [
    {
      path: error.path,
      message: 'cast error found',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;