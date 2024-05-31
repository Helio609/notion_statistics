'use server'

import { getURL } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email')?.toString()!
  const password = formData.get('password')?.toString()!

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getURL(),
    },
  })

  if (error) {
    redirect('/auth/error')
  }

  redirect('/auth/checkmail')
}
