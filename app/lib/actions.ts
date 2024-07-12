'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const tenMinutes = 60 * 10 * 1000

  cookies().set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { secure: true, expires: Date.now() + tenMinutes })
  cookies().set('name', 'value', { secure: true, expires: Date.now() + tenMinutes })

  const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
  });
  
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createProducts(formData: FormData) {
  const name = formData.get('name');
  const year = formData.get('year');
  const price = formData.get('price');
  const cpu = formData.get('cpu');
  const disk = formData.get('disk');
  
  try {
    
    const response = await fetch('https://api.restful-api.dev/objects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name":name,
        "data": {
          "year":year,
          "price":price,
          "cpu":cpu,
          "disk":disk
       }
      }),
    });

    const result = await response.json();
    console.log(result);
    
  } catch (error) {
    return {
      message: 'Failed to Create Products.',
    };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateProducts(id: string, formData: FormData) {
  const name = formData.get('name');
  
  try {

    const response = await fetch('https://api.restful-api.dev/objects/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name":name
      }),
    });

    const result = await response.json();
    console.log(result);
    
  }catch (error){
    return { message: 'Failed to Update Product.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function deleteProducts(id: string) {
  try {

    const response = await fetch('https://api.restful-api.dev/objects/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log(result);
    
  }catch (error){
    return { message: 'Failed to Delete Product.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.....';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('godriver_jwt')
  
  if (hasCookie== true){
      cookies().delete('godriver_jwt')
      cookies().delete('godriver_username')
      cookies().delete('godriver_roles')

      console.log('has cookies and deleted')
  }else{
      console.log('cookies does not exist')   
  }

  redirect('/login')  
}

export async function healthcheck() {
  try {
    const response = await fetch('http://127.0.0.1:8000/health_check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log("Connection is good");

    return result.code;

  }catch(error){
    console.log("The server is offline, please try again later.");

    return "The server is offline, please try again later.";
  }
}

export async function testLogin(
  prevState: string | undefined,
  formData: FormData,
) {
  const username = formData.get('username');
  const password = formData.get('password');

  const health_check = await healthcheck();
  if(health_check=='200'){
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username":username,
          "password":password,
        }),
      });
  
      const result = await response.json();
      console.log(result);
  
      if(result.code=='200'){
        const oneHour = 60 * 60 * 1000
        
        cookies().set('godriver_jwt', result.token, { secure: true, expires: Date.now() + oneHour })
        cookies().set('godriver_username', result.result.users.username, { secure: true, expires: Date.now() + oneHour })
        cookies().set('godriver_roles', result.result.roles.id, { secure: true, expires: Date.now() + oneHour })  
  
        redirect("/dashboard");
      }else{
        return result.message;
      }
    } catch (error) {
      console.log(error);
      throw error;    
    }
  }else{
    return health_check;
  }
}

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username":username,
        "password":password,
      }),
    });

    const result = await response.json();
    console.log(result);

    if(result.code=='200'){
      const oneDay = 24 * 60 * 60 * 1000
      const oneHour = 60 * 60 * 1000
      const tenMinutes = 60 * 10 * 1000
    
      cookies().set('godriver_jwt', result.token, { secure: true, expires: Date.now() + oneHour })
      cookies().set('godriver_username', result.result.users.username, { secure: true, expires: Date.now() + oneHour })
      cookies().set('godriver_roles', result.result.roles.id, { secure: true, expires: Date.now() + oneHour })
    }

    return result.code;

  } catch (error) {

    console.log(error);
    return "error";
  }
}