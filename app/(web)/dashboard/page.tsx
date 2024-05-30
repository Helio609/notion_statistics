import { createClient } from '@/utils/supabase/server'
import PlanSelect from './plan-select'
import Dashboard from './dashboard'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data } = await supabase.from('plans').select('id')

  return (
    <div className="container mt-10 space-y-4">
      <PlanSelect data={data || []} />
      <Dashboard />
    </div>
  )
}
