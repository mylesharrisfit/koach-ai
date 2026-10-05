export const TRIAL_DAYS = 30

// monthly: price per month billed monthly. yearly: effective price per month billed yearly.
export const PLANS = [
  {
    id: 'starter', name: 'Starter', monthly: 49, yearly: 39, yearlyTotal: 468,
    note: 'For coaches starting to take clients online.',
    features: ['Up to 10 clients', '5 AI generations a month'],
  },
  {
    id: 'pro', name: 'Pro', monthly: 89, yearly: 71, yearlyTotal: 852, popular: true,
    note: 'For working coaches with a full roster.',
    features: ['Up to 75 clients', 'Unlimited AI program and meal plan builders'],
  },
  {
    id: 'elite', name: 'Elite', monthly: 149, yearly: 119, yearlyTotal: 1428,
    note: 'For coaches with no ceiling on roster size.',
    features: ['Unlimited clients', 'Full AI coaching assistant'],
  },
  {
    id: 'enterprise', name: 'Enterprise', monthly: 299, yearly: 239, yearlyTotal: 2868,
    note: 'For practices, gyms and teams.',
    features: ['Unlimited clients', 'Team seats', 'Team AI', 'API access'],
  },
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
