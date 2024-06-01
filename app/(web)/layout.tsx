import Footer from '@/components/footer'
import Header from '@/components/header'
import Script from 'next/script'
import { Toaster } from 'sonner'

export default function WebRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5329411986081309"
        crossOrigin="anonymous"
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer />
      </div>
    </>
  )
}
