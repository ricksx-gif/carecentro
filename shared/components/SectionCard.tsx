import { Card, CardContent } from "@/components/ui/card"

type Props = {
  title?: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
}: Props) {
  return (
    <Card className={`bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg ${className}`}>
      <CardContent className="p-5 space-y-4">
        
        {(title || description || action) && (
          <div className="flex justify-between items-start gap-4">
            
            <div className="space-y-1">
              {title && (
                <h3 className="text-lg font-semibold text-white/90">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-white/50">
                  {description}
                </p>
              )}
            </div>

            {action && (
              <div className="shrink-0">
                {action}
              </div>
            )}

          </div>
        )}

        <div>
          {children}
        </div>

      </CardContent>
    </Card>
  )
}