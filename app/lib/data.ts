import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

export const fetchUsers = async () => {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase
        .from('users')
        .select('*, providers(*)')
        .order('created_at', { ascending: false });

    return data;
}

export const fetchProviders = async () => {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

    return data;
}

export const deleteUserById = async (id: number) => {
    const supabase = createServerComponentClient({ cookies });

    await supabase
        .from('users')
        .delete()
        .eq('id', id);
}

export const checkIfEmailIsValid = async (email: string) => {
    const supabase = createServerComponentClient({cookies});
    const { data } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .limit(1);

        console.log('got data: ', data)
    return !data?.length;
}
