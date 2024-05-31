import { BarChartBig } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { createClient } from '@/utils/supabase/server'
import { Button } from './ui/button'
import Link from 'next/link'

export default async function Header() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <BarChartBig className="w-6 h-6" />
          <span className="font-bold text-xs">Notion Statistics</span>
        </a>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {!user ? (
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
