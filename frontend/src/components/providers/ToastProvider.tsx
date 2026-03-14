import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react"
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ToastVariant = "default" | "success" | "error"

interface ToastItem {
  id: number
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (input: {
    title: string
    description?: string
    variant?: ToastVariant
  }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const variantClasses: Record<ToastVariant, string> = {
  default: "border-border bg-background/95",
  success: "border-emerald-200 bg-emerald-50/95 text-emerald-950",
  error: "border-red-200 bg-red-50/95 text-red-950"
}

const variantIcons: Record<ToastVariant, typeof Info> = {
  default: Info,
  success: CheckCircle2,
  error: AlertCircle
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default"
    }: {
      title: string
      description?: string
      variant?: ToastVariant
    }) => {
      const id = Date.now() + Math.floor(Math.random() * 1000)
      setToasts((current) => [...current, { id, title, description, variant }])
      window.setTimeout(() => removeToast(id), 3500)
    },
    [removeToast]
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-2xl border px-4 py-3 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.55)] backdrop-blur transition animate-in slide-in-from-right-5 fade-in",
              variantClasses[item.variant]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {(() => {
                  const Icon = variantIcons[item.variant]

                  return (
                    <div className="mt-0.5 rounded-full bg-white/70 p-1">
                      <Icon className="size-4" />
                    </div>
                  )
                })()}
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                {item.description ? (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                ) : null}
              </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="h-7 w-7 shrink-0"
                onClick={() => removeToast(item.id)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("ToastContext not found")
  }

  return context
}
