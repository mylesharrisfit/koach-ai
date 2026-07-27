import { motion, useScroll, useSpring } from 'framer-motion'
import { SignupProvider } from './components/SignupModal'
import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Metrics from './components/Metrics'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-400 to-ai"
    />
  )
}

export default function App() {
  return (
    <SignupProvider>
      <ScrollProgress />
      <Background />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <Metrics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </SignupProvider>
  )
}
