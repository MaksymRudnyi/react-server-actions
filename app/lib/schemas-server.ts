import { z } from "zod";
import { checkIfEmailIsValid } from "./data";
import {SignInSchema } from './schemas-client'

  export const SignInSchemaWithEmailCheck = SignInSchema.extend({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email.")
        .refine(async (e) => {
          // Where checkIfEmailIsValid makes a request to the backend
          // to see if the email is valid.
          console.log('check email', e)
          return await checkIfEmailIsValid(e);
        //   return await checkIfEmailIsValid(e);
        }, "This email is already registered"),
  })