import React from "react"
import { SectionCard } from "./SectionCard"

type Props = {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: Props) {
  return (
    <SectionCard>
      <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
        
        <h3 className="text-lg font-semibold text-white/90">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-white/50 max-w-md">
            {description}
          </p>
        )}

        {action && (
          <div className="pt-2">
            {action}
          </div>
        )}

      </div>
    </SectionCard>
  )
}