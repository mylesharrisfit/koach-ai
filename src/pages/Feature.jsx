import { lazy, Suspense } from 'react'
import Demo from '../demos/Demo'
import CtaForm from '../components/CtaForm'
import Icon from '../components/Icons'
import Piece from '../components/Pieces'
import BrandStudio from '../components/BrandStudio'
import { AiPill, Reveal, TierPill, ZoomIn } from '../components/fx'
import { Faq, FinalCta, SectionHead } from '../components/Sections'
import { FEATURES, GROUPS, featureUrl } from '../lib/features'
import StagePhoto from '../components/StagePhoto'
import { photoUrl } from '../lib/photos'

const WorkoutDemo = lazy(() => import('../components/WorkoutDemo'))

// One template for every feature page. Hero -> product visual -> benefits -> alternating rows of
// floating product pieces -> (interactive demo) -> related features -> FAQ -> final CTA.
// Rows alternate sides and stage colors so pages built from the same parts don't feel stamped out.
export default function Feature({ slug }) {
  const f = FEATURES[slug]
  const group = GROUPS.find((g) => g.id === f.group)

  return (
    <>
      <section className="bg-white pb-14 pt-12 sm:pb-20 sm:pt-20">
        <div className="wrap text-center">
          <p className="hero-in eyebrow">{group.label} · {f.nav}</p>
          <h1 className="hero-in h-mega mx-auto mt-5 max-w-4xl text-[2.7rem] sm:text-[4.2rem] lg:text-[4.8rem]" style={{ '--i': 1 }}>{f.title}</h1>
          <p className="hero-in lede-xl mx-auto mt-6 max-w-2xl" style={{ '--i': 2 }}>{f.lede}</p>
          <div className="hero-in mt-8 flex justify-center" style={{ '--i': 3 }}>
            <CtaForm id="feature-email" light className="flex w-full max-w-md flex-col items-center" />
          </div>
        </div>
        {f.scene && (
          <div className="wrap mt-14">
            <ZoomIn>
              <div className="hero-zoom stage-soft mx-auto max-w-5xl p-3 sm:p-8">
                <Demo scene={f.scene} label={f.demo} />
              </div>
            </ZoomIn>
          </div>
        )}
      </section>

      {f.studio && <BrandStudio heading={false} />}

      <section className="cv section bg-mist">
        <div className="wrap">
          <SectionHead eyebrow="What you get" title={`${f.nav}, built in`} center />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {f.benefits.map(([icon, t, d, ai, tier], i) => (
              <Reveal key={t} i={i} className="pillar">
                <span className="pillar-n"><Icon name={icon} size={22} /></span>
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 text-2xl">
                    {t}
                    {ai && <AiPill />}
                    {tier && <TierPill>{tier}</TierPill>}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mut">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv section bg-white">
        <div className="wrap grid gap-20 sm:gap-28">
          {f.rows.map(([t, d, pieces], i) => (
            <div key={t} className="fp-row" data-flip={i % 2 ? '' : undefined}>
              <Reveal>
                <p className="num text-sm text-brand-text">0{i + 1}</p>
                <h2 className="h-mega mt-3 text-[2.1rem] sm:text-[3rem]">{t}</h2>
                <p className="lede-xl mt-4 max-w-lg">{d}</p>
              </Reveal>
              <ZoomIn kind="card">
                <div className={`fp-vis ${i % 2 || photoUrl(`feature-${slug}-${i}`) ? 'stage-blue' : 'stage-soft'}`} aria-hidden="true">
                  <StagePhoto slot={photoUrl(`feature-${slug}-${i}`) ? `feature-${slug}-${i}` : i % 2 ? `feature-${slug}` : null} />
                  {pieces.map((k) => <div key={k} className="fl-bob" style={{ animationDelay: `${-i * 0.9}s` }}><Piece k={k} /></div>)}
                </div>
              </ZoomIn>
            </div>
          ))}
        </div>
      </section>

      {f.workout && (
        <section className="cv section bg-mist">
          <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHead eyebrow="Try it" title="Log a set the way your clients do">
              Sample data, nothing stored. Set the weight, log the set, rest, and finish the workout.
            </SectionHead>
            <div className="stage-blue py-10">
              <StagePhoto slot="workout" />
              <Suspense fallback={<div className="h-[600px]" />}>
                <WorkoutDemo />
              </Suspense>
            </div>
          </div>
        </section>
      )}

      <section className="cv section bg-white">
        <div className="wrap">
          <SectionHead eyebrow="Works together" title="Related features" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {f.related.map((s, i) => {
              const r = FEATURES[s]
              return (
                <Reveal as="a" key={s} i={i} href={featureUrl(s)} className="rel group">
                  <span className="pillar-n"><Icon name={r.icon} size={22} /></span>
                  <b className="text-xl">{r.nav}</b>
                  <span className="text-[15px] text-mut">{r.desc}</span>
                  <span className="mt-2 inline-flex items-center gap-2 text-[15px] font-bold">Learn more <span className="cat-arrow !h-8 !w-8"><Icon name="arrow" size={16} /></span></span>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <Faq only={f.faq} id="ffaq" />
      <FinalCta />
    </>
  )
}
