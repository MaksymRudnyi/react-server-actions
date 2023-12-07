"use server"
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache'
import { SignInSchemaWithEmailCheck} from '@/app/lib/schemas-server'
import { deleteUserById } from './data';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export const createInvoice = async (formData: FormData) => {
  const validatedFields = await SignInSchemaWithEmailCheck.safeParseAsync({
    amount: formData.get('amount'),
    status: formData.get('status'),
    provider_id: formData.get('provider_id'),
    name: formData.get('name'),
    email: formData.get('email')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten()?.fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const supabase = createServerActionClient({ cookies });

  try {
    await supabase.from('users').insert(validatedFields.data)
    console.log('inserted: ', validatedFields.data)
  } catch (e) {
    return {
      message: 'error'
    }
  }

  console.log('submit tweet');
  revalidatePath('/')

  console.log('validatedFields: ', validatedFields)
}

export const deleteUser = async (id: number) => {
  console.log('id to delete: ', id)
  try {
    await deleteUserById(id);
  } catch(e) {
    console.log('failed to delete record')
  }
  
  revalidatePath('/')
}