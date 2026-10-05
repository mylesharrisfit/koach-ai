const UPDATED = 'October 5, 2026'

function Page({ title, children }) {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="prose-legal max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-neutral-500">Last updated {UPDATED}</p>
        {children}
      </div>
    </section>
  )
}

export function Privacy() {
  return (
    <Page title="Privacy Policy">
      <p>This policy explains what personal information KOACH AI collects through koachai.net and the KOACH AI application, how it is used, and the choices you have.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Account information: name, email address and password for coaches and clients.</li>
        <li>Coaching data you or your clients enter: programs, workouts, nutrition logs, check-ins, photos and body measurements.</li>
        <li>Billing information: handled by our payment processor, Stripe. We do not store full card numbers.</li>
        <li>Usage and device data: pages viewed, features used, browser type and IP address.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To provide, secure and support the service.</li>
        <li>To process payments and send service-related messages.</li>
        <li>To improve the product and fix problems.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>We share data only with service providers that help us run KOACH AI, such as hosting and payment processing, and when required by law. We do not sell personal information. A client’s data is visible to the coach they train with.</p>
      <h2>Retention and deletion</h2>
      <p>We keep data while your account is active. You can ask us to delete your account and associated data, subject to legal retention requirements.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, you may have the right to access, correct, export or delete your personal information. Contact us from within your KOACH AI account to make a request.</p>
      <h2>Changes</h2>
      <p>If we change this policy we will update the date above and, for material changes, notify account holders.</p>
    </Page>
  )
}

export function Terms() {
  return (
    <Page title="Terms of Service">
      <p>These terms govern your use of KOACH AI. By creating an account or using the service you agree to them.</p>
      <h2>The service</h2>
      <p>KOACH AI provides software for fitness coaches to manage programming, nutrition, check-ins, client records and payments. We may change or improve features over time.</p>
      <h2>Accounts</h2>
      <p>You are responsible for your account credentials and for activity under your account. You must provide accurate information and be at least 18 years old.</p>
      <h2>Free trial and billing</h2>
      <p>Plans start with a 30-day free trial. After the trial, your plan is billed monthly or annually, as you selected, until you cancel. You can cancel at any time and your access continues to the end of the paid period. Fees are non-refundable except where required by law.</p>
      <h2>Your content</h2>
      <p>You own the content you and your clients put into KOACH AI. You give us permission to host and process it to provide the service. You are responsible for having the right to use it, including client consent for health-related data.</p>
      <h2>Acceptable use</h2>
      <p>Do not misuse the service, attempt to access other accounts, interfere with its operation, or use it for unlawful purposes.</p>
      <h2>Health disclaimer</h2>
      <p>KOACH AI is a business tool for coaches. It does not provide medical advice. Coaches are responsible for the programs and nutrition guidance they give their clients, including any content drafted with the help of the program builder.</p>
      <h2>Termination</h2>
      <p>You may stop using the service at any time. We may suspend or terminate accounts that breach these terms.</p>
      <h2>Liability</h2>
      <p>The service is provided “as is”. To the extent permitted by law, KOACH AI is not liable for indirect or consequential damages, and our total liability is limited to the fees you paid in the 12 months before the claim.</p>
      <h2>Changes</h2>
      <p>We may update these terms. Continued use after an update means you accept the new terms.</p>
    </Page>
  )
}
