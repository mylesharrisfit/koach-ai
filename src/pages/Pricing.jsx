import PricingTable from '../components/PricingTable'

export default function Pricing() {
  return (
    <section className="wrap py-16 sm:py-24">
      <h1 className="max-w-2xl text-4xl sm:text-5xl">Pricing</h1>
      <p className="mt-4 max-w-xl text-lg text-neutral-600">
        Four plans, priced by how many clients you coach. Every plan starts with a 30-day free trial.
      </p>
      <div className="mt-12">
        <PricingTable />
      </div>
    </section>
  )
}
