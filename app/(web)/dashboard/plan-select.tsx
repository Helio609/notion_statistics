'use client'

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import {
  CircleX,
  Database,
  HelpCircle,
  Loader2,
  NotebookText,
  Terminal,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { NewPlan } from './new-plan'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function PlanSelect({
  data,
}: {
  data: {
    id: string
    title?: string
    error?: boolean
    message?: string
    type?: string
  }[]
}) {
  const [planId, setPlanId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>()
  // const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!planId) return

    const params = new URLSearchParams()
    params.set('planId', planId)
    router.replace(`${pathname}?${params.toString()}`)

    let plan = data.find((v) => v.id == planId)
    if (plan?.error) {
      setMessage(plan.message)
      // setOpen(true)
    }
  }, [planId, pathname, router, data])

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
    <div className='flex flex-col space-y-2 w-full'>
      {message && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Latest Error</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col w-full sm:flex-row sm:space-y-0 sm:space-x-2 items-centers space-y-2">
        <Select
          onValueChange={(v) => setPlanId(v)}
          defaultValue={searchParams.get('planId')?.toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Plan" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((v) => (
              <SelectItem value={v.id} key={v.id}>
                <div className="flex items-center space-x-2">
                  {!v.type ? (
                    <CircleX className="w-4 h-4" />
                  ) : v.type == 'page' ? (
                    <NotebookText className="w-4 h-4" />
                  ) : (
                    <Database className="w-4 h-4" />
                  )}
                  <span className="truncate">{v.title ?? v.id}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex space-x-2">
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
          <Link
            href="https://helio609.notion.site/Notion-Statistics-Docs-b587d628a1884aa1bc1f08de0d93d1f4"
            target="_blank"
          >
            <Button variant="outline">
              <HelpCircle className="w-5 h-5 animate-pulse" />
            </Button>
          </Link>
        </div>

        {/* <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </div>
    </div>
  )
}
