import type { Priority, Task, TaskStatus } from '../api/types'
import { toISODate } from './date'

/** Ordre d'affichage des colonnes du board. */
export const STATUS_ORDER: readonly TaskStatus[] = ['TODO', 'DOING', 'DONE']

/** Libellés français, centralisés pour être réutilisés partout. */
export const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'À faire',
  DOING: 'En cours',
  DONE: 'Terminé',
}

/** Filtre pur : renvoie un nouveau tableau, ne modifie jamais l'entrée. */
export function tasksByStatus(tasks: readonly Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status)
}

/**
 * Une tâche est en retard si elle n'est pas terminée, qu'elle a une échéance
 * et que cette échéance est strictement antérieure à aujourd'hui.
 * `today` est un paramètre pour pouvoir tester la fonction sans dépendre du jour réel.
 */
export function isOverdue(task: Task, today: Date = new Date()): boolean {
  if (task.status === 'DONE' || task.dueDate === null) {
    return false
  }
  return task.dueDate < toISODate(today)
}

/** Garde de type : évite un cast `as TaskStatus` non vérifié. */
export function isTaskStatus(value: string): value is TaskStatus {
  return value === 'TODO' || value === 'DOING' || value === 'DONE'
}

/** Garde de type : évite un cast `as Priority` non vérifié. */
export function isPriority(value: string): value is Priority {
  return value === 'LOW' || value === 'MEDIUM' || value === 'HIGH'
}

export interface TaskStatsData {
  total: number
  done: number
  percent: number
  overdue: number
}

/**
 * Statistiques du board, calculées à partir de la liste complète.
 * Fonction pure : même entrée, même sortie, aucun état interne.
 */
export function computeStats(tasks: readonly Task[]): TaskStatsData {
  const total = tasks.length
  const done = tasks.filter((task) => task.status === 'DONE').length
  // Ne pas écrire tasks.filter(isOverdue) : filter passerait l'index en 2e argument.
  const overdue = tasks.filter((task) => isOverdue(task)).length

  return {
    total,
    done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    overdue,
  }
}
