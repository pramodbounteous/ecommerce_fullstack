import { useEffect, useRef } from "react"

export function useInfiniteScroll({
  enabled,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore
}: {
  enabled: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled || !ref.current || !hasNextPage || isFetchingNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore()
        }
      },
      {
        rootMargin: "240px"
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [enabled, hasNextPage, isFetchingNextPage, onLoadMore])

  return ref
}
