import Hero from '../components/Hero'
import FeatureTabs from '../components/FeatureTabs'
import Pricing from '../components/Pricing'
import { ProofStrip, CoachStyles, TodayBand, Capabilities, Integrations, Compare, Faq, FinalCta, SectionHead } from '../components/Sections'

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
      <CoachStyles />
      <TodayBand />
      <Capabilities />
      <Integrations />
      <Compare />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  )
}
