import { Board } from './components/Board'
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header projectName="Projet 1 · Tableau d'équipe" />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Board />
      </main>
    </div>
  )
}

export default App
