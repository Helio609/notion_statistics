'use client'

import Error from '@/components/error'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') ?? 'Auth Error'

  return (
    <div className="container mt-10">
      <Error message={message} />
    </div>
  )
}
