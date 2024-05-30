import Error from '@/components/error'
import React from 'react'

export default function AuthErrorPage() {
  return (
    <div className="container mt-10">
      <Error message="Auth Error" />
    </div>
  )
}
