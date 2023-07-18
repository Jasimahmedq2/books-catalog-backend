import { z } from 'zod';

const registerUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'you have to send the firstName',
      }),
      lastName: z.string({
        required_error: 'you have to send the LastName',
      }),
    }),
    password: z.string({
      required_error: 'you have to set a strong password',
    }),
    email: z
      .string({
        required_error: 'you have to set a unique email address',
      })
      .email(),
  }),
});
const logInUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'you have to set a strong password',
    }),
    email: z
      .string({
        required_error: 'you have to set a unique email address',
      })
      .email(),
  }),
});

export const userZodSchema = {
  registerUserZodSchema,
  logInUserZodSchema,
};
