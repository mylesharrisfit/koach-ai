import Hero from '../components/Hero'
import Showreel from '../components/Showreel'
import FeatureTabs from '../components/FeatureTabs'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import BrandStudio from '../components/BrandStudio'
import PhotoBand from '../components/PhotoBand'
import Manifesto from '../components/Manifesto'
import { LazyMount } from '../components/fx'
import { TESTIMONIALS } from '../data/testimonials'
import { LogoStrip, Categories, CoachStyles, Statement, Capabilities, Compare, Faq, FinalCta, SectionHead } from '../components/Sections'

// heavy sections fetch their code when they get near the viewport
const loadPlayground = () => import('../components/Playground')
const loadWeek = () => import('../components/Week')
const loadToday = () => import('../components/ActionCenter')

// Section order follows the Everfit homepage: hero, showreel, logo strip, service categories, product tour,
// high-ticket vs scalable, editorial statement, brand manifesto, capability areas, branding, results, pricing, FAQ, CTA.
export default function Home() {
  return (
    <>
      <Hero />
      <Showreel />
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
      <Manifesto />
      <PhotoBand />
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
