import type { Priority } from '../api/types'

interface PriorityBadgeProps {
  priority: Priority
}

interface PriorityStyle {
  label: string
  classes: string
}

/**
 * Record<Priority, ...> : si on ajoute une priorité au type,
 * TypeScript nous oblige à compléter ce tableau. Rien n'est oublié.
 */
const PRIORITY_STYLES: Record<Priority, PriorityStyle> = {
  LOW: {
    label: 'Basse',
    classes: 'bg-slate-100 text-slate-600 ring-slate-200',
  },
  MEDIUM: {
    label: 'Moyenne',
    classes: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  HIGH: {
    label: 'Haute',
    classes: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, classes } = PRIORITY_STYLES[priority]

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${classes}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}
