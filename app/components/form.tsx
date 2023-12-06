'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    AtSymbolIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import SubmitButton from '@/app/components/submitButton';
import { createInvoice } from '@/app/lib/actions';
import { SignInSchema } from '@/app/lib/schemas-client'
import { useRef } from 'react';

export default function Form({ providers }) {
    const initialState = { message: null, errors: {} };
    const ref = useRef<HTMLFormElement>(null);
    const clientAction = async (prevState, formData: FormData) => {
        const newForm = {
            amount: formData.get('amount'),
            status: formData.get('status'),
            provider_id: formData.get('provider_id'),
            name: formData.get('name'),
            email: formData.get('email')
        };

        const result = SignInSchema.safeParse(newForm);

        console.log('result: ', result)
        if (!result.success) {
            return {
                errors: result.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create Invoice.',
            };
        }

        const serverResult = await createInvoice(formData);

        console.log('serverResult: ', serverResult);
        ref.current?.reset();
        return serverResult;
    }

    const [state, dispatch] = useFormState(clientAction, initialState);
    console.log('state1', state);

    return (
        <form action={dispatch} ref={ref}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter a name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                step="0.01"
                                placeholder="Enter your name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Enter Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                step="0.01"
                                placeholder="Enter your email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="provider" className="mb-2 block text-sm font-medium">
                        Choose provider
                    </label>
                    <div className="relative">
                        <select
                            id="provider"
                            name="provider_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="provider-error"
                        >
                            <option value="" disabled>
                                Select a provider
                            </option>
                            {providers.map((provider) => (
                                <option key={provider.id} value={provider.id}>
                                    {provider.title}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="provider-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.provider_id &&
                            state.errors.provider_id.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div id="amount-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.amount &&
                                state.errors.amount.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Pending <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Paid <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <SubmitButton/>
            </div>
        </form>
    );
}