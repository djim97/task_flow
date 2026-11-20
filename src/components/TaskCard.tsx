import type { ChangeEvent } from 'react'
import type { Task, TaskStatus } from '../api/types'
import { formatDueDate } from '../lib/date'
import { isOverdue, isTaskStatus, STATUS_LABELS, STATUS_ORDER } from '../lib/tasks'
import { PriorityBadge } from './PriorityBadge'

interface TaskCardProps {
  task: Task
  onStatusChange: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
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

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9L12 4M6.5 7v4M9.5 7v4" />
    </svg>
  )
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  // Valeur dérivée : calculée au rendu, jamais stockée dans un état.
  const overdue = isOverdue(task)

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    if (isTaskStatus(value)) {
      onStatusChange(task.id, value)
    }
  }

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <PriorityBadge priority={task.priority} />
        {overdue && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 ring-1 ring-red-200 ring-inset">
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

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        {task.dueDate === null ? (
          <span className="text-xs text-slate-400">Sans échéance</span>
        ) : (
          <span
            className={`inline-flex items-center gap-1.5 text-xs ${
              overdue ? 'font-medium text-red-600' : 'text-slate-500'
            }`}
          >
            <CalendarIcon />
            {formatDueDate(task.dueDate)}
          </span>
        )}

        <div className="flex shrink-0 items-center gap-1">
          <select
            value={task.status}
            onChange={handleStatusChange}
            aria-label={`Statut de « ${task.title} »`}
            className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Supprimer « ${task.title} »`}
            className="grid size-7 place-items-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  )
}
