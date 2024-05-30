'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function NewPlan() {
  const [notionAuth, setNotionAuth] = useState<string | null>(null)
  const [root, setRoot] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleNewPlan = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!notionAuth || !root || !user) return

    const { error } = await supabase.from('plans').insert({
      notion_auth: notionAuth,
      root_id: root,
      user_id: user?.id!,
    })

    setLoading(false)
    setOpen(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.info('Created')
  }, [notionAuth, root])

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add new plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notion_auth" className="text-right">
              Notion_Auth
            </Label>
            <Input
              onBlur={(v) => setNotionAuth(v.target.value)}
              id="notion_auth"
              className="col-span-3"
              placeholder="secret_xxxxxx"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="root" className="text-right">
              Root
            </Label>
            <Input
              onBlur={(v) => setRoot(v.target.value)}
              id="root"
              className="col-span-3"
              placeholder="35974328-866e-4352-8742-1a7398d87d1b"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleNewPlan} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
