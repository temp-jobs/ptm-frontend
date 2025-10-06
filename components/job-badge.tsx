import { Badge } from "@/components/ui/badge"
import { Flame, Star, Target, ShieldCheck, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface JobBadgeProps {
  type: "hot" | "recommended" | "bestFit" | "verified" | "urgent" | "new"
  className?: string
}

export function JobBadge({ type, className }: JobBadgeProps) {
  const badges = {
    hot: {
      icon: Flame,
      label: "Hot",
      className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    },
    recommended: {
      icon: Star,
      label: "Recommended",
      className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    bestFit: {
      icon: Target,
      label: "Best Fit",
      className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    },
    verified: {
      icon: ShieldCheck,
      label: "Verified",
      className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    urgent: {
      icon: Clock,
      label: "Urgent",
      className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    },
    new: {
      icon: Sparkles,
      label: "New",
      className: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    },
  }

  const badge = badges[type]
  const Icon = badge.icon

  return (
    <Badge variant="outline" className={cn("gap-1 font-medium", badge.className, className)}>
      <Icon className="h-3 w-3" />
      {badge.label}
    </Badge>
  )
}
