import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { Client } from '@notionhq/client'
import { HelpCircle } from 'lucide-react'
import Link from 'next/link'
import Dashboard from './dashboard'
import PlanSelect from './plan-select'

export default async function DashboardPage() {
  const supabase = createClient()
  let { data } = await supabase.from('plans').select('id, root_id, notion_auth')

  const notion = new Client({
    auth: data?.at(0)?.notion_auth,
  })

  let plans = []

  if (data) {
    for (let item of data) {
      const block = await notion.blocks.retrieve({ block_id: item.root_id })
      if (block) {
        if ('child_page' in block) {
          plans.push({ id: item.id, title: block['child_page']['title'] })
        } else if ('child_database' in block) {
          plans.push({ id: item.id, title: block['child_database']['title'] })
        }
      }
    }
  }

  return (
    <div className="container mt-10 space-y-4">
      <div className="flex space-x-2">
        <PlanSelect data={plans || []} />
        <Link href="/help">
          <Button variant="outline">
            <HelpCircle className="w-5 h-5 animate-pulse" />
          </Button>
        </Link>
      </div>
      <Dashboard />
    </div>
  )
}
