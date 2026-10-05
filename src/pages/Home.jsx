import Hero from '../components/Hero'
import FeatureTabs from '../components/FeatureTabs'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import { LazyMount } from '../components/fx'
import { TESTIMONIALS } from '../data/testimonials'
import { ProofStrip, CoachStyles, Capabilities, Marquees, Compare, Faq, FinalCta, SectionHead } from '../components/Sections'

// heavy sections fetch their code when they get near the viewport
const loadTryIt = () => import('../components/TryIt')
const loadWeek = () => import('../components/Week')
const loadToday = () => import('../components/TodayBand')

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <section id="features" className="section">
        <div className="wrap">
          <SectionHead eyebrow="Features" title="Everything you coach with, in one place" center />
          <div className="mt-10">
            <FeatureTabs />
          </div>
        </div>
      </section>
      <LazyMount load={loadTryIt} id="try-it" className="bg-mist" minH="900px" />
      <LazyMount load={loadWeek} id="week" className="bg-graphite" minH="1600px" />
      <CoachStyles />
      <LazyMount load={loadToday} id="today" className="bg-graphite" minH="900px" />
      <Capabilities />
      <Marquees />
      <Compare />
      <Pricing />
      {TESTIMONIALS.length > 0 && <Testimonials />}
      <Faq />
      <FinalCta />
    </>
  )
}
