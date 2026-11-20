import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { Priority, TaskDraft } from '../api/types'
import { toISODate } from '../lib/date'
import { isPriority } from '../lib/tasks'

interface TaskFormProps {
  onCreate: (draft: TaskDraft) => void
}

interface FormErrors {
  title?: string
  dueDate?: string
}

const PRIORITY_OPTIONS: ReadonlyArray<{ value: Priority; label: string }> = [
  { value: 'LOW', label: 'Basse' },
  { value: 'MEDIUM', label: 'Moyenne' },
  { value: 'HIGH', label: 'Haute' },
]

function fieldClasses(hasError: boolean): string {
  const base =
    'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:ring-2'
  return hasError
    ? `${base} border-red-400 focus:border-red-500 focus:ring-red-500/20`
    : `${base} border-slate-300 focus:border-blue-500 focus:ring-blue-500/20`
}

export function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('MEDIUM')
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const today = toISODate(new Date())

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    if (isPriority(value)) {
      setPriority(value)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (title.trim().length < 3) {
      nextErrors.title = 'Le titre doit contenir au moins 3 caractères.'
    }
    if (dueDate !== '' && dueDate < today) {
      nextErrors.dueDate = "L'échéance ne peut pas être dans le passé."
    }

    setErrors(nextErrors)
    if (nextErrors.title !== undefined || nextErrors.dueDate !== undefined) {
      return
    }

    onCreate({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate === '' ? null : dueDate,
    })

    setTitle('')
    setDescription('')
    setPriority('MEDIUM')
    setDueDate('')
    setErrors({})
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">Nouvelle tâche</h2>
        <p className="text-[11px] text-slate-400">
          Titre ≥ 3 caractères · échéance non passée
        </p>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="task-title"
            className="mb-1 block text-xs font-semibold text-slate-600"
          >
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex. Brancher le formulaire sur l'API"
            aria-invalid={errors.title !== undefined}
            aria-describedby={errors.title !== undefined ? 'task-title-error' : undefined}
            className={fieldClasses(errors.title !== undefined)}
          />
          {errors.title !== undefined && (
            <p
              id="task-title-error"
              role="alert"
              className="mt-1 text-xs font-medium text-red-600"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="task-priority"
            className="mb-1 block text-xs font-semibold text-slate-600"
          >
            Priorité
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={handlePriorityChange}
            className={fieldClasses(false)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="task-due-date"
            className="mb-1 block text-xs font-semibold text-slate-600"
          >
            Échéance
          </label>
          <input
            id="task-due-date"
            type="date"
            min={today}
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            aria-invalid={errors.dueDate !== undefined}
            aria-describedby={
              errors.dueDate !== undefined ? 'task-due-date-error' : undefined
            }
            className={fieldClasses(errors.dueDate !== undefined)}
          />
          {errors.dueDate !== undefined && (
            <p
              id="task-due-date-error"
              role="alert"
              className="mt-1 text-xs font-medium text-red-600"
            >
              {errors.dueDate}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="task-description"
            className="mb-1 block text-xs font-semibold text-slate-600"
          >
            Description
          </label>
          <textarea
            id="task-description"
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Facultatif : contexte, critères d'acceptation…"
            className={`${fieldClasses(false)} resize-y`}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Ajouter la tâche
        </button>
      </div>
    </form>
  )
}
