// Mirrors the app, which is what charges and enforces:
//   prices  -> koach-ai-fitness-coaching-platform/src/lib/planPricing.js (= Stripe lookup keys koach_<plan>_<interval>)
//   limits & features -> src/lib/subscription.js + supabase/functions/_shared/subscriptionTiers.js
// A feature listed here must be unlocked at that plan in subscription.js. Change both together.
export const TRIAL_DAYS = 30

// monthly: price per month billed monthly. yearly: effective price per month billed yearly.
export const PLANS = [
  {
    id: 'starter', name: 'Starter', monthly: 49, yearly: 39, yearlyTotal: 468,
    note: 'For coaches starting to take clients online.',
    features: ['Up to 10 clients', '15 AI generations a month', 'AI program and meal plan builders', 'Nutrition, scheduling and messaging', 'Client app for workouts and check-ins', 'Invoices and Stripe payments'],
  },
  {
    id: 'pro', name: 'Pro', monthly: 89, yearly: 71, yearlyTotal: 852, popular: true,
    note: 'For working coaches with a full roster.',
    features: ['Up to 75 clients', '100 AI generations a month', 'Check-in review with AI summaries and drafted replies', 'Everything in Starter', 'Adherence and progress tracking', 'Program templates', 'AI onboarding'],
  },
  {
    id: 'elite', name: 'Elite', monthly: 149, yearly: 119, yearlyTotal: 1428,
    note: 'For coaches with no ceiling on roster size.',
    features: ['Unlimited clients', '300 AI generations a month', 'White-label client app and full AI coaching assistant', 'Everything in Pro', 'AI assistant: auto progression, nutrition, progress and business insights, InBody scan', 'Revenue dashboard, store and sales pipeline'],
  },
  {
    id: 'enterprise', name: 'Enterprise', monthly: 299, yearly: 239, yearlyTotal: 2868,
    note: 'For practices, gyms and teams.',
    features: ['Unlimited clients', 'Unlimited AI generations', 'Team seats for your coaches', 'Everything in Elite'],
  },
]

// "What's in each plan" table. from = the first plan that includes the row (higher plans include it too).
export const PLAN_ROWS = [
  { f: 'AI program and meal plan builders', from: 'starter' },
  { f: 'Program builder with exercise library', from: 'starter' },
  { f: 'Nutrition targets and macro tracking', from: 'starter' },
  { f: 'Client app: workouts, nutrition and check-ins', from: 'starter' },
  { f: 'Invoices and Stripe payments', from: 'starter' },
  { f: 'Client records, notes and history', from: 'starter' },
  { f: 'Check-in review with photos and body measurements', from: 'pro' },
  { f: 'AI check-in summaries and drafted replies', from: 'pro' },
  { f: 'Adherence, progress and client analytics', from: 'pro' },
  { f: 'Program templates', from: 'pro' },
  { f: 'White-label client app', from: 'elite' },
  { f: 'Full AI coaching assistant', from: 'elite' },
  { f: 'Revenue dashboard', from: 'elite' },
  { f: 'Team seats', from: 'enterprise' },
]
export const inPlan = (row, planId) => PLANS.findIndex((p) => p.id === planId) >= PLANS.findIndex((p) => p.id === row.from)
