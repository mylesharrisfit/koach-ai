export const TRIAL_DAYS = 30

export const PLANS = [
  { id: 'starter', name: 'Starter', monthly: 29, annual: 23, clients: '10 clients', note: 'For coaches just starting to take clients online.' },
  { id: 'pro', name: 'Pro', monthly: 79, annual: 63, clients: '75 clients', note: 'For working coaches with a full roster.', popular: true },
  { id: 'elite', name: 'Elite', monthly: 149, annual: 119, clients: 'Unlimited clients', note: 'For coaches with no ceiling on roster size.' },
  { id: 'enterprise', name: 'Enterprise', monthly: 299, annual: 239, clients: 'Unlimited clients', note: 'For large practices and gyms.' },
]

export const INCLUDED = [
  'Program builder with exercise library',
  'Nutrition targets and macro tracking',
  'Weekly check-ins with photos and body measurements',
  'Client mobile app',
  'Stripe payments and subscriptions',
  'Client records, notes and history',
  'Revenue, retention and progress reporting',
]
