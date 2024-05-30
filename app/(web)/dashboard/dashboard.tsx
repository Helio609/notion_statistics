'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardBanner from './components/banner'

export default function Dashboard() {
  const [planId, setPlanId] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    setPlanId(searchParams.get('planId')?.toString() || null)
  }, [searchParams])

  return (
    <>
      {planId && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl decoration-sky-500 underline">Banner</h2>
          <div className="h-60">
            <DashboardBanner planId={planId} />
          </div>
        </div>
      )}
    </>
  )
}
