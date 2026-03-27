import React from "react"
import { SectionCard } from "./SectionCard"

type Props = {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <SectionCard>
      <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
        
        <h3 className="text-lg font-semibold text-red-400">
          Error
        </h3>

        <p className="text-sm text-white/60 max-w-md">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            Reintentar
          </button>
        )}

      </div>
    </SectionCard>
  )
}