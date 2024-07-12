import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Button } from '@/app/ui/button';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { createProducts } from '@/app/lib/actions';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Products',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <form action={createProducts}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
           <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue=""
                    placeholder="Name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Year
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="year"
                    name="year"
                    type="text"
                    defaultValue=""
                    placeholder="Year"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Price
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    defaultValue=""
                    placeholder="Price"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                CPU Model
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="cpu"
                    name="cpu"
                    type="text"
                    defaultValue=""
                    placeholder="CPU Model"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Hard Disk Size
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="disk"
                    name="disk"
                    type="text"
                    defaultValue=""
                    placeholder="Hard Disk Size"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>        
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/products"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Products</Button>
          </div>
        </form>
    </main>
  );
}