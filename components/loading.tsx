import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  )
}
