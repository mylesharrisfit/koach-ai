import { APP_URL } from '../lib/config'

// Unknown paths used to render the home page (a "soft 404" that search engines index as a copy of
// home). Now they say so, link onward, and are marked noindex (see App.jsx / lib/head.js).
export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap max-w-xl text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="h-mega mt-4 text-[2.4rem] sm:text-[3.2rem]">That page doesn’t exist.</h1>
        <p className="lede-xl mt-5">The link may be old or mistyped. Here is where you probably wanted to go.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="btn btn-brand">Home</a>
          <a href="/#pricing" className="btn btn-outline-dark">Pricing</a>
          <a href={`${APP_URL}/login`} className="btn btn-outline-dark">Log in</a>
        </div>
      </div>
    </section>
  )
}
