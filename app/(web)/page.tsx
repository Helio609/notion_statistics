import Banner from '@/components/statistics/banner'

export default function Home() {
  const planId = 'e9f34b2e-9534-4db6-ac59-dfdca294e0f2'

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-2xl text-center md:text-4xl">
        <span className="underline decoration-indigo-500 decoration-4">
          Statistics
        </span>{' '}
        For Your Notion
      </h1>

      <h2 className="text-3xl decoration-sky-500 underline">Banner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full h-36">
          <Banner planId={planId} blockCnt />
        </div>
        <div className="w-full h-36">
          <Banner planId={planId} wordCnt />
        </div>
        <div className="w-full h-60">
          <Banner planId={planId} blockCnt wordCnt />
        </div>
        <div>
          <Banner planId={planId} />
        </div>
      </div>

      <hr />

      <h2 className="text-2xl decoration-sky-500 underline text-center">More is coming</h2>
    </div>
  )
}
