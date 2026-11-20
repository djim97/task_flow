import type { Task } from '../api/types'
import { computeStats } from '../lib/tasks'

interface TaskStatsProps {
  tasks: readonly Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  // Tout est dérivé de la liste : aucun useState, aucun useEffect.
  const { total, done, percent, overdue } = computeStats(tasks)

  return (
    <section
      aria-label="Statistiques du board"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-40 flex-1">
          <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Avancement
          </p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums text-slate-900">{percent} %</p>
          <div
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Avancement du projet"
            className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
          >
            <div
              className="h-full rounded-full bg-blue-500 transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <dl className="flex gap-6">
          <div>
            <dt className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Total
            </dt>
            <dd className="mt-0.5 text-lg font-bold tabular-nums text-slate-900">{total}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Terminées
            </dt>
            <dd className="mt-0.5 text-lg font-bold tabular-nums text-emerald-600">{done}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              En retard
            </dt>
            <dd
              className={`mt-0.5 text-lg font-bold tabular-nums ${
                overdue > 0 ? 'text-red-600' : 'text-slate-900'
              }`}
            >
              {overdue}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
