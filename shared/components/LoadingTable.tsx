import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  rows?: number
}

export function LoadingTable({ rows = 5 }: Props) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[20%]" />
        </div>
      ))}
    </div>
  )
}