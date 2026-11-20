interface HeaderProps {
  projectName: string
}

export function Header({ projectName }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5">
        <div
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-black text-white shadow-lg shadow-blue-500/20"
        >
          TF
        </div>

        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">TaskFlow Teams</p>
          <p className="text-xs text-slate-400">{projectName}</p>
        </div>

        <span className="ml-auto rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-slate-700 ring-inset">
          Données locales
        </span>
      </div>
    </header>
  )
}
