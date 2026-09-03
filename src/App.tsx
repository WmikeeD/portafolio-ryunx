import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-brand-dark dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App
