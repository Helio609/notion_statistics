'use client'

import Banner from '@/components/statistics/banner'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function BannerPage({
  params: { plan_id },
}: {
  params: { plan_id: string }
}) {
  const searchParams = useSearchParams()
  let blockCnt = Boolean(searchParams.get('blockCnt')) || false
  let wordCnt = Boolean(searchParams.get('wordCnt')) || false

  if (!blockCnt && !wordCnt) {
    blockCnt = true
    wordCnt = true
  }

  return <Banner planId={plan_id} blockCnt={blockCnt} wordCnt={wordCnt} />
}
