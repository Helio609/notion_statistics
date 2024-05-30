'use client'

import Banner from '@/components/statistics/banner'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DashboardBanner({ planId }: { planId: string }) {
  const [blockCnt, setBlockCnt] = useState(false)
  const [wordCnt, setWordCnt] = useState(false)

  const handleCopy = () => {
    const baseUrl = `${window.location.origin}/statistics/${planId}/banner`
    const params = new URLSearchParams()

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
      <Banner planId={planId} blockCnt={blockCnt} wordCnt={wordCnt} />
      <div className="flex space-x-2">
        <ToggleGroup type="multiple" onValueChange={(v) => console.log(v)}>
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
        <Button onClick={handleCopy}>Copy</Button>
      </div>
    </>
  )
}
