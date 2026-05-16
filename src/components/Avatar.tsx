import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarWithBadge({
  image,
  active,
  name,
}: {
  image: string
  active: boolean
  name: string
}) {
  const initials = name ? name.charAt(0).toUpperCase() : "A"

  return (
    <Avatar>
      <AvatarImage src={image} alt={name} className="object-cover" />

      <AvatarFallback className="bg-slate-200 font-bold">
        {initials}
      </AvatarFallback>

      {active && (
        <AvatarBadge className="bg-green-500 ring-2 ring-white dark:ring-slate-900" />
      )}
    </Avatar>
  )
}
