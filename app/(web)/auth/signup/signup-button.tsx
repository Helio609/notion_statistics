'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function SignUpButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Create an account'}
    </Button>
  )
}
