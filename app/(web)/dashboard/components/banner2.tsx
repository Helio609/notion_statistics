'use client'

import Banner2 from '@/components/statistics/banner2'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DashboardBanner2({ planId }: { planId: string }) {
  const [blockCnt, setBlockCnt] = useState(true)
  const [wordCnt, setWordCnt] = useState(true)
  const [daysAgo, setDaysAgo] = useState(1)

  const handleCopy = () => {
    const baseUrl = `${window.location.origin}/statistics/${planId}/banner2`
    const params = new URLSearchParams()

    params.append('daysAgo', daysAgo.toString())

    if (blockCnt) {
      params.append('blockCnt', blockCnt.toString())
    }

    if (wordCnt) {
      params.append('wordCnt', wordCnt.toString())
    }

    const urlWithParams = `${baseUrl}?${params.toString()}`

    navigator.clipboard
      .writeText(urlWithParams)
      .then(() => {
        toast.info('URL copied to clipboard!')
      })
      .catch((err) => {
        toast.error('Failed to copy URL: ', err)
      })
  }

  return (
    <>
      <Banner2
        planId={planId}
        blockCnt={blockCnt}
        wordCnt={wordCnt}
        daysAgo={daysAgo}
      />
      <div className="flex space-x-2">
        <ToggleGroup
          defaultValue={['block', 'word']}
          type="multiple"
          onValueChange={(v) => console.log(v)}
        >
          <ToggleGroupItem
            value="block"
            variant="outline"
            onClick={() => setBlockCnt(!blockCnt)}
          >
            Block
          </ToggleGroupItem>
          <ToggleGroupItem
            value="word"
            variant="outline"
            onClick={() => setWordCnt(!wordCnt)}
          >
            Word
          </ToggleGroupItem>
        </ToggleGroup>
        <Input
          placeholder="Days ago(default 1 day)"
          className="w-56"
          onBlur={(v) => setDaysAgo(Number(v.target.value) || 1)}
          type="number"
        />
        <Button onClick={handleCopy}>Copy</Button>
      </div>
    </>
  )
}
