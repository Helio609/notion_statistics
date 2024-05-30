import Footer from '@/components/footer'
import Header from '@/components/header'
import { Toaster } from 'sonner'

export default function WebRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Toaster />
      <Footer />
    </div>
  )
}
