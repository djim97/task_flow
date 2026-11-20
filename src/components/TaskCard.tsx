import type { Task } from '../api/types'
import { formatDueDate } from '../lib/date'
import { isOverdue } from '../lib/tasks'
import { PriorityBadge } from './PriorityBadge'

interface TaskCardProps {
  task: Task
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M2 6.5h12M5.5 2v2M10.5 2v2" />
    </svg>
  )
}

export function TaskCard({ task }: TaskCardProps) {
  // Valeur dérivée : calculée au rendu, jamais stockée dans un état.
  const overdue = isOverdue(task)

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <PriorityBadge priority={task.priority} />
        {overdue && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 ring-1 ring-inset ring-red-200">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            En retard
          </span>
        )}
      </div>

      <h3 className="mt-2 line-clamp-2 text-sm leading-snug font-semibold text-slate-900">
        {task.title}
      </h3>

      {task.description !== '' && (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        {task.dueDate === null ? (
          <span className="text-slate-400">Sans échéance</span>
        ) : (
          <span
            className={
              overdue ? 'inline-flex items-center gap-1.5 font-medium text-red-600' : 'inline-flex items-center gap-1.5'
            }
          >
            <CalendarIcon />
            {formatDueDate(task.dueDate)}
          </span>
        )}
      </div>
    </li>
  )
}
