import { useState } from 'react'
import type { Task, TaskDraft, TaskStatus } from '../api/types'
import { mockTasks } from '../data/mockTasks'
import { STATUS_ORDER, tasksByStatus } from '../lib/tasks'
import { Column } from './Column'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'
import { TaskStats } from './TaskStats'

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  )
}

export function Board() {
  // Source de vérité unique du board : la liste des tâches.
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [query, setQuery] = useState('')

  function handleCreate(draft: TaskDraft) {
    setTasks((current) => {
      const nextId = Math.max(0, ...current.map((task) => task.id)) + 1
      const newTask: Task = {
        ...draft,
        id: nextId,
        projectId: 1,
        status: 'TODO',
        assigneeId: null,
        createdAt: new Date().toISOString(),
      }
      return [...current, newTask]
    })
  }

  function handleStatusChange(id: number, status: TaskStatus) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    )
  }

  function handleDelete(id: number) {
    if (!window.confirm('Supprimer cette tâche ?')) {
      return
    }
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  // Liste dérivée : recalculée à chaque rendu, jamais stockée dans un état.
  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <section aria-labelledby="board-title" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Kanban
          </p>
          <h2 id="board-title" className="text-xl font-bold tracking-tight text-slate-900">
            Tableau de bord
          </h2>
        </div>

        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Rechercher une tâche</span>
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une tâche…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>

      <TaskStats tasks={tasks} />
      <TaskForm onCreate={handleCreate} />

      <div className="grid gap-3 md:grid-cols-3">
        {STATUS_ORDER.map((status) => (
          <Column key={status} status={status}>
            {tasksByStatus(visibleTasks, status).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </Column>
        ))}
      </div>
    </section>
  )
}
