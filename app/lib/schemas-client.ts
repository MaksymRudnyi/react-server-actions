import { z } from "zod";

export const SignInSchema = z.object({
    id: z.string().optional(),
    provider_id: z.string(),
    name: z.string()
          .min(1, 'Name should be minimum 1 char')
          .max(100, 'Maximum length is 100 chars'),
      email: z
          .string()
          .min(1, { message: "This field has to be filled." })
          .email("This is not a valid email."),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select a status.',
    }),
    date: z.string().optional(),
  });
