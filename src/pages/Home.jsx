import Hero from '../components/Hero'
import FeatureTabs from '../components/FeatureTabs'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import BrandStudio from '../components/BrandStudio'
import { LazyMount } from '../components/fx'
import { TESTIMONIALS } from '../data/testimonials'
import { LogoStrip, Categories, CoachStyles, Statement, Capabilities, Compare, Faq, FinalCta, SectionHead } from '../components/Sections'

// heavy sections fetch their code when they get near the viewport
const loadPlayground = () => import('../components/Playground')
const loadWeek = () => import('../components/Week')
const loadToday = () => import('../components/TodayBand')

// Section order follows the Everfit homepage: hero, logo strip, service categories, product tour,
// high-ticket vs scalable, editorial statement, capability areas, branding, results, pricing, FAQ, CTA.
export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Categories />
      <section id="features" className="section">
        <div className="wrap">
          <SectionHead eyebrow="Product tour" title="Watch the product do the work" center />
          <div className="mt-10">
            <FeatureTabs />
          </div>
        </div>
      </section>
      <CoachStyles />
      <Statement />
      <LazyMount load={loadWeek} id="week" className="bg-graphite" minH="1600px" />
      <Capabilities />
      <BrandStudio />
      <LazyMount load={loadToday} id="today" className="bg-graphite" minH="900px" />
      <LazyMount load={loadPlayground} id="try-it" className="bg-mist" minH="1000px" />
      <Compare />
      <Pricing />
      {TESTIMONIALS.length > 0 && <Testimonials />}
      <Faq />
      <FinalCta />
    </>
  )
}
