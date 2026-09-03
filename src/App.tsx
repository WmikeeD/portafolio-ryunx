import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import QAShowcase from './components/sections/QAShowcase'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-brand-dark dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <QAShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
