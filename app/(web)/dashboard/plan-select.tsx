'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { NewPlan } from './new-plan'

export default function PlanSelect({
  data,
  error,
  message,
}: {
  data: { id: string; title: string }[]
  error: boolean
  message?: string
}) {
  const [planId, setPlanId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!planId) return

    const params = new URLSearchParams()
    params.set('planId', planId)
    router.replace(`${pathname}?${params.toString()}`)
  }, [planId, pathname, router])

  useEffect(() => {
    setPlanId(searchParams.get('planId')?.toString() || null)
  }, [searchParams])

  function handleDeletePlan(planId: string) {
    setLoading(true)
    const supabase = createClient()
    supabase
      .from('plans')
      .delete()
      .eq('id', planId)
      .then((v) => {
        setLoading(false)
        if (v.error) {
          toast.error(v.error.message)
          return
        }

        toast.info('Delete successfully')
        setTimeout(() => {
          router.refresh()
        }, 2000)
      })
  }

  return (
    <div className="flex items-center space-x-2">
      {!error && (
        <Select
          onValueChange={(v) => setPlanId(v)}
          defaultValue={searchParams.get('planId')?.toString()}
        >
          <SelectTrigger className="w-[320px]">
            <SelectValue placeholder="Select a Plan" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((v) => (
              <SelectItem value={v.id} key={v.id}>
                {v.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {error && (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Warning</AlertDialogTitle>
              <AlertDialogDescription>
                {message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {planId && (
        <Button
          variant="destructive"
          disabled={loading}
          onClick={() => handleDeletePlan(planId)}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Delete'}
        </Button>
      )}
      <NewPlan />
    </div>
  )
}
