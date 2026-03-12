import type { ReactNode } from "react"

interface Props {
  title: string
  subtitle: string
  children: ReactNode
}

export default function AuthCard({ title, subtitle, children }: Props) {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-md w-[420px] p-10 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Shopwill</h1>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        {children}

        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to our Terms of service
        </p>

      </div>

    </div>
  )
}