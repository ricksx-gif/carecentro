import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

type Props = {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "danger"
}

const baseStyles = `
  cursor-pointer
  focus:bg-transparent
`

const variants = {
  default: `
    text-white/70
    hover:text-white
    hover:bg-white/10
    data-[highlighted]:bg-white/10
    data-[highlighted]:text-white
  `,
  danger: `
    text-red-400
    hover:text-red-300
    hover:bg-red-500/10
    data-[highlighted]:bg-red-500/10
    data-[highlighted]:text-red-300
  `,
}

export function DropdownItem({
  children,
  onClick,
  variant = "default",
}: Props) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </DropdownMenuItem>
  )
}