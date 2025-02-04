// copied from supabase documentationn + edited for my application

'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()


  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/focus')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=Error signing up')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signOut() {
  const supabase = await createClient();
  (await supabase).auth.signOut();
  redirect('/')
  
}

export async function getName() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id;
}