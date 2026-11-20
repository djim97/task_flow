import { Children, type ReactNode } from 'react'
import type { TaskStatus } from '../api/types'
import { STATUS_LABELS } from '../lib/tasks'

interface ColumnProps {
  status: TaskStatus
  /** Les cartes de la colonne, passées en composition depuis Board. */
  children?: ReactNode
}

const DOT_CLASSES: Record<TaskStatus, string> = {
  TODO: 'bg-slate-400',
  DOING: 'bg-blue-500',
  DONE: 'bg-emerald-500',
}

export function Column({ status, children }: ColumnProps) {
  // Le compteur est dérivé des enfants : une seule source de vérité.
  const count = Children.count(children)
  const title = STATUS_LABELS[status]
  const headingId = `column-${status.toLowerCase()}`
  const countLabel = `${count} tâche${count > 1 ? 's' : ''}`

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-2.5"
    >
      <header className="flex items-center gap-2 px-1 py-1">
        <span aria-hidden="true" className={`size-2 rounded-full ${DOT_CLASSES[status]}`} />
        <h2 id={headingId} className="text-sm font-semibold text-slate-700">
          {title}
        </h2>
        <span
          aria-label={countLabel}
          className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 ring-inset"
        >
          {count}
        </span>
      </header>

      {count === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-3 py-10 text-center text-xs text-slate-400">
          Aucune tâche
        </p>
      ) : (
        <ul className="flex flex-1 flex-col gap-2">{children}</ul>
      )}
    </section>
  )
}
