import { Skeleton } from "@/components/ui/skeleton"

export default function CartSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-4 rounded-xl border p-4">
          <Skeleton className="h-24 w-24 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-28" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}
