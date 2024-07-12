import { UpdateProducts, DeleteProducts, CreateProducts } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

async function getData() {
    const response = await fetch('https://api.restful-api.dev/objects')
    
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const responseBody = await response.json();

    //console.log('------------------------------')
    //console.log(responseBody);
    //console.log(responseBody.length);
    //console.log(responseBody[0]['id'])
    //console.log(responseBody[0]['name'])
    //console.log('------------------------------')
    
    return responseBody;
}

export default async function Page() {
    const data = await getData()

    for (let i = 0; i < data.length; i++) {
        console.log(data[i]['id'])
        console.log(data[i]['name'])
        console.log('------------------------------')
    }

    return (  
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <CreateProducts />
        </div>  
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Name
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">

                {data?.map((datas : {id:string, name:string}) => (

                    <tr  key={datas.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                      <td className="whitespace-nowrap px-3 py-3">
                        {datas.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {datas.name}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                            <UpdateProducts id={datas.id} />
                            <DeleteProducts id={datas.id} />
                        </div>
                      </td>
                    </tr>
                 ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      );
  }

