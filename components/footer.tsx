import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6">
      <div className="container flex flex-col items-center justify-between gap-4">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          Built by &nbsp;
          <Link href="https://github.com/helio609">Helio609</Link>
        </p>
      </div>
    </footer>
  )
}