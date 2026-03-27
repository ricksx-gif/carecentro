type Props = {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: Props) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-2 border-white/20 border-t-white/80 rounded-full animate-spin ${className}`}
      />
    </div>
  )
}