import { createClient } from '@/utils/supabase/server'
import { Client, isNotionClientError } from '@notionhq/client'
import Dashboard from './dashboard'
import PlanSelect from './plan-select'

export default async function DashboardPage() {
  const supabase = createClient()
  let { data } = await supabase
    .from('plans')
    .select('id, root_id, notion_auth, last_error')

  const notion = new Client({
    auth: data?.at(0)?.notion_auth,
  })

  let plans = []

  if (data) {
    for (let item of data) {
      try {
        const block = await notion.blocks.retrieve({ block_id: item.root_id })
        if (block) {
          if ('child_page' in block) {
            plans.push({
              id: item.id,
              title: block['child_page']['title'],
              type: 'page',
              error: item.last_error ? true : false,
              message: item.last_error || undefined,
            })
          } else if ('child_database' in block) {
            plans.push({
              id: item.id,
              title: block['child_database']['title'],
              type: 'database',
              error: item.last_error ? true : false,
              message: item.last_error || undefined,
            })
          }
        }
      } catch (e) {
        if (isNotionClientError(e)) {
          plans.push({
            id: item.id,
            error: true,
            message: e.message,
          })
        }
      }
    }
  }

  return (
    <div className="container mt-10 space-y-4">
      <div className="flex space-x-2">
        <PlanSelect data={plans || []} />
      </div>
      <Dashboard />
    </div>
  )
}
