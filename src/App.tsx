import GlobalBackground from './components/layout/GlobalBackground'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import BusinessServices from './components/sections/BusinessServices'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import QAShowcase from './components/sections/QAShowcase'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BusinessServices />
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
