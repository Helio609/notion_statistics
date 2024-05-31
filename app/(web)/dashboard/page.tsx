import { createClient } from '@/utils/supabase/server'
import PlanSelect from './plan-select'
import Dashboard from './dashboard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data } = await supabase.from('plans').select('id')

  return (
    <div className="container mt-10 space-y-4">
      <div className="flex space-x-2">
        <PlanSelect data={data || []} />
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
