'use client'

import Banner2 from '@/components/statistics/banner2'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function Banner2Page({
  params: { plan_id },
}: {
  params: { plan_id: string }
}) {
  const searchParams = useSearchParams()
  let blockCnt = Boolean(searchParams.get('blockCnt')) || false
  let wordCnt = Boolean(searchParams.get('wordCnt')) || false
  let daysAgo = Number(searchParams.get('daysAgo')) || 1

  if (!blockCnt && !wordCnt) {
    blockCnt = true
    wordCnt = true
  }

  return (
    <Banner2
      planId={plan_id}
      blockCnt={blockCnt}
      wordCnt={wordCnt}
      daysAgo={daysAgo}
    />
  )
}
