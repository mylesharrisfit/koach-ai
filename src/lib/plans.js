export const TRIAL_DAYS = 30

// monthly: price per month billed monthly. yearly: effective price per month billed yearly.
export const PLANS = [
  {
    id: 'starter', name: 'Starter', monthly: 49, yearly: 39, yearlyTotal: 468,
    note: 'For coaches starting to take clients online.',
    features: ['Up to 10 clients', '15 AI generations a month', 'AI program and meal plan builders', 'White-label client app', 'Check-ins', 'Stripe billing'],
  },
  {
    id: 'pro', name: 'Pro', monthly: 89, yearly: 71, yearlyTotal: 852, popular: true,
    note: 'For working coaches with a full roster.',
    features: ['Up to 75 clients', '100 AI generations a month', 'Everything in Starter', 'AI onboarding', 'AI check-in summaries and drafted replies'],
  },
  {
    id: 'elite', name: 'Elite', monthly: 149, yearly: 119, yearlyTotal: 1428,
    note: 'For coaches with no ceiling on roster size.',
    features: ['Unlimited clients', '300 AI generations a month', 'Everything in Pro', 'Full AI coaching assistant: auto progression, nutrition, progress and business insights, InBody scan'],
  },
  {
    id: 'enterprise', name: 'Enterprise', monthly: 299, yearly: 239, yearlyTotal: 2868,
    note: 'For practices, gyms and teams.',
    features: ['Unlimited clients', 'Unlimited AI', 'Everything in Elite', 'Team seats', 'Team AI', 'API access'],
  },
]

// "What's in each plan" table. from = the first plan that includes the row (higher plans include it too).
export const PLAN_ROWS = [
  { f: 'AI program and meal plan builders', from: 'starter' },
  { f: 'Program builder with exercise library', from: 'starter' },
  { f: 'Nutrition targets and macro tracking', from: 'starter' },
  { f: 'Weekly check-ins with photos and body measurements', from: 'starter' },
  { f: 'Client mobile app', from: 'starter' },
  { f: 'White-label client app', from: 'starter' },
  { f: 'Stripe payments and billing', from: 'starter' },
  { f: 'Client records, notes and history', from: 'starter' },
  { f: 'Revenue, retention and progress reporting', from: 'starter' },
  { f: 'AI check-in summaries and drafted replies', from: 'pro' },
  { f: 'Full AI coaching assistant', from: 'elite' },
]
export const inPlan = (row, planId) => PLANS.findIndex((p) => p.id === planId) >= PLANS.findIndex((p) => p.id === row.from)
