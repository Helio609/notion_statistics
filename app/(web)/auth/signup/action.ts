'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email')?.toString()!
  const password = formData.get('password')?.toString()!

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    redirect('/auth/error')
  }

  redirect('/auth/checkmail')
}
