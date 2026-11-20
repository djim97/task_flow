import type { Task } from '../api/types'
import { STATUS_ORDER, tasksByStatus } from '../lib/tasks'
import { Column } from './Column'
import { TaskCard } from './TaskCard'

interface BoardProps {
  tasks: readonly Task[]
}

export function Board({ tasks }: BoardProps) {
  return (
    <section aria-labelledby="board-title">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Kanban
          </p>
          <h2 id="board-title" className="text-xl font-bold tracking-tight text-slate-900">
            Tableau de bord
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          {tasks.length} tâche{tasks.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {STATUS_ORDER.map((status) => (
          <Column key={status} status={status}>
            {tasksByStatus(tasks, status).map((task) => (
              // key = identifiant stable de la donnée, jamais l'index.
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>
        ))}
      </div>
    </section>
  )
}
