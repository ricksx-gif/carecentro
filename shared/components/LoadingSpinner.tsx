type Props = {
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ size = "md" }: Props) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }
  
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-2 border-gray-300 border-t-black rounded-full animate-spin`}
      />
    </div>
  )
}