import type { Task, TaskStatus } from '../api/types'
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
