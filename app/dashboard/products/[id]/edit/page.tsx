import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { updateProducts } from '@/app/lib/actions';

async function getData(id: string) {
    const response = await fetch('https://api.restful-api.dev/objects/'+id)
    
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const responseBody = await response.json();

    console.log('------------------------------')
    console.log(responseBody);
    console.log('------------------------------')

    return responseBody;
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;    
    const data = await getData(id);
    const updateProductsWithId = updateProducts.bind(null, id);

    return (
        <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Products', href: '/dashboard/products' },
            {
              label: 'Edit Products',
              href: `/dashboard/products/${id}/edit`,
              active: true,
            },
          ]}
        />
        <form action={updateProductsWithId}>
          <input type="hidden" name="id" value={data.id} />  
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
                    defaultValue={data.name}
                    placeholder="Name"
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
            <Button type="submit">Edit Products</Button>
          </div>
        </form>
        </main>
      );
}