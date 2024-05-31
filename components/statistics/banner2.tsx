'use client'

import { createClient } from '@/utils/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import Error from '../error'
import Loading from '../loading'

interface BannerProps {
  planId: string
  blockCnt?: boolean
  wordCnt?: boolean
  daysAgo: number
}

export default function Banner2({
  planId,
  blockCnt,
  wordCnt,
  daysAgo,
}: BannerProps) {
  const [latestData, setLatestData] = useState({
    blocks: 0,
    words: 0,
    created_at: '',
  })
  const [previousData, setPreviousData] = useState({
    blocks: 0,
    words: 0,
    created_at: '',
  })
  const [error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const fetchData = async () => {
      const today = new Date()
      const pastDate = new Date(today)
      pastDate.setDate(today.getDate() - daysAgo)

      const { data: latestData, error: latestError } = await supabase
        .from('statistics')
        .select('created_at, blocks, words')
        .eq('plan_id', planId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const { data: previousData, error: previousError } = await supabase
        .from('statistics')
        .select('created_at, blocks, words')
        .eq('plan_id', planId)
        .gte('created_at', pastDate.toISOString())
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (latestError) {
        console.error('Error fetching latest data:', latestError)
        setError(latestError)
      } else if (previousError) {
        console.error('Error fetching previous data:', previousError)
        setError(previousError)
      } else if (latestData) {
        const latestCreatedAt = formatDistanceToNow(
          new Date(latestData.created_at),
        )
        const previousCreatedAt = formatDistanceToNow(
          new Date(previousData?.created_at || pastDate),
        )
        setLatestData({
          blocks: latestData.blocks,
          words: latestData.words,
          created_at: latestCreatedAt,
        })
        setPreviousData({
          blocks: previousData?.blocks || 0,
          words: previousData?.words || 0,
          created_at: previousCreatedAt || pastDate.toLocaleString(),
        })
      }
      setLoading(false)
    }

    fetchData()
  }, [planId, daysAgo])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error.message} />
  }

  const blockIncrease = latestData.blocks - previousData.blocks
  const wordIncrease = latestData.words - previousData.words

  return (
    <div className="dark:bg-[#202020] rounded-lg shadow-lg p-6 h-full w-full m-2">
      {blockCnt || wordCnt ? (
        <>
          <p className="text-2xl font-bold text-gray-800 dark:text-foreground">
            You wrote
          </p>
          {blockCnt && (
            <p className="text-4xl font-semibold text-gray-900 dark:text-foreground my-2">
              <span className="underline decoration-indigo-500">
                {blockIncrease} blocks
              </span>
            </p>
          )}
          {blockCnt && wordCnt && (
            <p className="text-2xl font-bold text-gray-800 dark:text-foreground">
              and
            </p>
          )}
          {wordCnt && (
            <p className="text-4xl font-semibold text-gray-900 dark:text-foreground my-2">
              <span className="underline decoration-indigo-500">
                {wordIncrease} words
              </span>
            </p>
          )}
          <p className="text-sm font-mono text-muted-foreground">
            {latestData.created_at} vs {previousData.created_at}
          </p>
        </>
      ) : (
        <Error message="Nothing to show" />
      )}
    </div>
  )
}
