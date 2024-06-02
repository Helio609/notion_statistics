export default function StatisticsRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="dark:bg-[#191919] flex justify-center items-center w-full min-h-screen">
      {children}
    </div>
  )
}
