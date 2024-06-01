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
}

export default function Banner({ planId, blockCnt, wordCnt }: BannerProps) {
  const [data, setData] = useState({
    blocks: 0,
    words: 0,
    created_at: '',
  })
  const [error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)
  const [nothing, setNothing] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('created_at, blocks, words')
        .eq('plan_id', planId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error('Error fetching data:', error)
        setError(error)
      } else if (data) {
        const created_at = formatDistanceToNow(new Date(data.created_at))
        setData({
          blocks: data.blocks,
          words: data.words,
          created_at: created_at,
        })
      } else {
        setNothing(true)
      }
      setLoading(false)
    }

    fetchData()
  }, [planId])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (nothing) {
    return <Error message="Nothing to show, wait a second" />
  }

  return (
    <div className="dark:bg-[#202020] rounded-lg shadow-lg p-6 h-full w-full m-2">
      {blockCnt || wordCnt ? (
        <>
          <p className="text-2xl font-bold text-gray-800 dark:text-foreground">
            Your notion page has
          </p>
          {blockCnt && (
            <p className="text-4xl font-semibold text-gray-900 dark:text-foreground my-2">
              <span className="underline decoration-indigo-500">
                {data.blocks}
              </span>{' '}
              blocks
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
                {data.words}
              </span>{' '}
              words
            </p>
          )}
          <p className="text-sm font-mono text-muted-foreground">
            {data.created_at}
          </p>
        </>
      ) : (
        <Error message="Nothing to show" />
      )}
    </div>
  )
}
