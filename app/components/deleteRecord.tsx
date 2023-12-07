import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteUser } from '../lib/actions';
export function DeleteRecord({ id }: { id: number }) {
    const deleteInvoiceWithId = deleteUser.bind(null, id);
  
    return (
      <form action={deleteInvoiceWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }