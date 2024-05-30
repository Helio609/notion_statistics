import { OctagonAlert } from 'lucide-react'

export default function Error({ message }: { message: string }) {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <OctagonAlert className="animate-ping" />
      <p className="text-muted-foreground text-xs">{message}</p>
    </div>
  )
}
