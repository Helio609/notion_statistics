'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardBanner from './components/banner'
import DashboardBanner2 from './components/banner2'

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
          <div className="flex flex-col space-y-2">
            <DashboardBanner planId={planId} />
            <DashboardBanner2 planId={planId} />
          </div>
        </div>
      )}
    </>
  )
}
