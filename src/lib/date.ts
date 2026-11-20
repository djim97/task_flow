/**
 * Date locale au format "AAAA-MM-JJ".
 * On évite toISOString() qui convertit en UTC et peut décaler le jour.
 */
export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * "2026-11-15" -> "15 nov. 2026".
 * On découpe la chaîne nous-mêmes : new Date("2026-11-15") est interprété
 * comme minuit UTC, donc affiché la veille dans certains fuseaux.
 */
export function formatDueDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
