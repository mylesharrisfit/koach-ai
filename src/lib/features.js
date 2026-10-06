// Every feature page, the mega menu, the footer and the home category grid read from here, so a claim
// is written once. Only features the app has. Sample data shown in visuals is fictional.
// ai = AI-powered, tier = plan needed. piece = a floating UI piece from components/Pieces.jsx.

export const FEATURES = {
  coaching: {
    slug: 'coaching', group: 'coach', icon: 'clipboard', scene: 'builder',
    nav: 'Programs & AI builder', desc: 'Build programs in minutes, review every line',
    card: 'Workout programming', cardText: 'An exercise library, templates and an AI builder that drafts the whole program.', ai: true,
    pieces: ['program', 'reviewed', 'swap'],
    eyebrow: 'Coach',
    title: 'Build programs in minutes. Review every line.',
    lede: 'Describe the client and the AI drafts a full program from your exercise library. Swap exercises for injuries and equipment, edit anything, then send it to the client app.',
    demo: 'Animated demo. A coach types a request for a 12-week hypertrophy program with a bad left knee, clicks Build with AI, and the weekly plan fills in. One exercise is swapped for a knee-friendly one, and the coach sends the reviewed program to the client.',
    benefits: [
      ['clipboard', 'Program builder', 'An exercise library with sets, reps and rest for every training day.'],
      ['spark', 'AI program builder', 'Describe the client and get a full draft to edit.', true],
      ['layers', 'Templates', 'Save a program as a template and assign it to the next client.', false, 'Pro and up'],
    ],
    rows: [
      ['The AI drafts. You decide.', 'Build with AI from the client’s profile and your preferences, then review the draft week by week before you assign it.', ['program', 'reviewed']],
      ['Swap for injuries and equipment', 'Bad knee, home gym, no barbell. Swap an exercise and the rest of the week stays as you built it.', ['swap', 'program']],
      ['Sets, reps, rest, RPE and tempo', 'Every exercise carries sets, reps, rest, RPE, tempo and set type (straight, superset, dropset, AMRAP or to failure), with sections for warm-up, main work, finisher and cooldown.', ['program', 'template']],
    ],
    related: ['nutrition', 'client-app', 'check-ins'],
    faq: ['How accurate is the AI?', 'What counts as an AI generation?'],
  },
  nutrition: {
    slug: 'nutrition', group: 'coach', icon: 'leaf', scene: 'meals',
    nav: 'Nutrition & meal plans', desc: 'Macro targets and AI meal plans',
    card: 'Nutrition coaching', cardText: 'Macro targets, tracking and AI meal plans built to them.', ai: true,
    pieces: ['macros', 'meal', 'swapFood'],
    eyebrow: 'Coach',
    title: 'Meal plans built around the macros.',
    lede: 'Set nutrition targets, let the AI build a meal plan to them, and swap foods while the macros re-count. Food data comes from USDA FoodData Central.',
    demo: 'Animated demo. Calorie, protein, carb and fat rings fill to target, four meals appear, and swapping rice for potatoes updates the macro totals.',
    benefits: [
      ['leaf', 'Targets and macro tracking', 'Calories, protein, carbs and fat set per client.'],
      ['spark', 'AI meal plans', 'A full day of meals built to the client’s targets.', true],
      ['swap', 'Swap a food, keep the macros', 'Swap rice for potatoes and the totals update.'],
    ],
    rows: [
      ['Targets your client can see', 'Calories, protein, carbs and fat on the client’s phone, filling up as they log.', ['macros', 'meal']],
      ['AI meal plans you review', 'The AI builds the day to the targets. You check it, change what you want, and send it.', ['meal', 'macros']],
      ['Food data from USDA FoodData Central', 'Foods and their macros come from USDA FoodData Central, so the numbers hold up.', ['swapFood', 'macros']],
    ],
    related: ['coaching', 'client-app', 'check-ins'],
    faq: ['What counts as an AI generation?', 'Which tools does it connect to?'],
  },
  'client-app': {
    slug: 'client-app', group: 'engage', icon: 'phone', scene: 'app', workout: true,
    nav: 'Client app', desc: 'Workout logging, rest timer and messaging',
    card: 'Client app & messaging', cardText: 'Your clients log sets, rest between them, see last time’s numbers and message you.',
    pieces: ['setRow', 'rest', 'newBest'],
    eyebrow: 'Engage',
    title: 'A client app that stays out of the way.',
    lede: 'Your clients see today’s workout, log weight and reps set by set with last time’s numbers in view, rest on a built-in timer and message you, all under your brand.',
    demo: 'Animated demo of the client phone app. Weight and reps are entered for the last set, the set is checked off, the set is marked Logged and a rest timer counts down.',
    benefits: [
      ['timer', 'Logger with rest timer', 'Weight and reps set by set, with a rest timer between them.'],
      ['trophy', 'Last time, every time', 'Each exercise shows last session’s weight and reps, so clients know what to beat.'],
      ['message', 'Direct messaging', 'Clients message you from the same app they train in.'],
    ],
    rows: [
      ['Logging that keeps up with the session', 'Log a set and the rest timer takes over, with the next set ready to go. Skip it whenever you like.', ['setRow', 'rest']],
      ['Wins they can see', 'A Workout Complete summary with duration, sets and volume, and new PRs in their progress.', ['newBest', 'message']],
      ['Your brand, not ours', 'Your logo, colors and coaching name on the app your clients open every day.', ['brand', 'setRow']],
    ],
    related: ['branding', 'check-ins', 'nutrition'],
    faq: ['Is KOACH white-label?', 'Can I switch from another app?'],
  },
  'check-ins': {
    slug: 'check-ins', group: 'engage', icon: 'camera', scene: 'checkin',
    nav: 'Check-ins', desc: 'A review queue with AI-drafted replies',
    card: 'Check-ins & progress', cardText: 'Photos, measurements and workouts on one card, with an AI-drafted reply.', ai: true,
    pieces: ['checkin', 'aiDraft', 'adherence'],
    eyebrow: 'Engage',
    title: 'Review check-ins in a queue, not an inbox.',
    lede: 'Run My Day puts one client on screen at a time: photos, measurements, energy, sleep and the weight trend. Draft a reply with AI, mark it reviewed, and the next client is up.',
    demo: 'Animated demo. A check-in card shows progress photos, weight down 1.4 lb and 6 of 6 workouts. An AI-drafted reply is made warmer, sent, and the next client’s card slides in.',
    benefits: [
      ['camera', 'Photos and measurements', 'Progress photos, body measurements and the week’s workouts together, in a review queue.', false, 'Pro and up'],
      ['message', 'AI summaries and drafted replies', 'An AI check-in summary and a draft reply for you to edit.', true, 'Pro and up'],
      ['chart', 'Adherence tracking', 'Workout, nutrition and check-in adherence per client, with streaks and trends.', false, 'Pro and up'],
    ],
    rows: [
      ['One client at a time', 'Front, side and back photos, measurements, energy, sleep, stress and the weight trend on one card, next to your previous response.', ['checkin', 'adherence']],
      ['Replies in your voice', 'Press AI Draft for a reply built from the check-in, edit it, and mark the check-in reviewed. Nothing goes out until you send it.', ['aiDraft', 'message']],
      ['Run My Day', 'Missed check-ins, clients without a program, failed payments and unread messages, sorted into Urgent, This week and When you can, with a one-tap action on each.', ['action', 'adherence']],
    ],
    related: ['client-app', 'business', 'coaching'],
    faq: ['How accurate is the AI?', 'What counts as an AI generation?'],
  },
  business: {
    slug: 'business', group: 'manage', icon: 'card', scene: 'business',
    nav: 'Payments & scheduling', desc: 'Stripe billing, scheduling and revenue',
    pieces: ['revenue', 'payment', 'session'],
    eyebrow: 'Manage',
    title: 'Payments, scheduling and status in one place.',
    lede: 'Take payments and subscriptions with Stripe, schedule check-ins with Zoom, Calendly or Google Calendar, and watch revenue and client status update as it happens.',
    demo: 'Animated demo. A Stripe payment arrives, monthly revenue counts up, a client changes from Trial to Active, and a Zoom check-in fills a calendar slot.',
    benefits: [
      ['card', 'Stripe payments and subscriptions', 'One-off payments and recurring subscriptions through Stripe.'],
      ['calendar', 'Zoom, Calendly and Google Calendar', 'Schedule check-ins with the tools you already use.'],
      ['chart', 'Revenue, retention and progress', 'Client progress and analytics on Pro, the revenue dashboard on Elite.', false, 'Pro and up'],
    ],
    rows: [
      ['Get paid without chasing', 'Clients pay and subscribe through Stripe, and payments show up next to the client they belong to.', ['payment', 'revenue']],
      ['Scheduling that connects', 'Zoom, Calendly and Google Calendar, so in-person and online sessions sit in one week.', ['session', 'payment']],
      ['See the business at a glance', 'Monthly recurring revenue, client lifetime value, churn and a revenue forecast in one view.', ['revenue', 'adherence']],
    ],
    related: ['check-ins', 'branding', 'coaching'],
    faq: ['Which tools does it connect to?', 'Can I cancel anytime?'],
  },
  branding: {
    slug: 'branding', group: 'scale', icon: 'tag', studio: true,
    nav: 'White-label app', desc: 'Your logo, colors and name',
    pieces: ['brand', 'setRow'],
    eyebrow: 'Scale',
    title: 'Your brand on your clients’ phones.',
    lede: 'Your app name, logos, colors and fonts on the client portal, from the login page to the emails, so clients see your business, not ours.',
    benefits: [
      ['tag', 'Your logo and colors', 'The client app takes on your brand colors.', false, 'Elite and up'],
      ['phone', 'Your coaching name', 'Clients see your business name, not KOACH.', false, 'Elite and up'],
      ['layers', 'Login, splash and email', 'Brand the login page, the loading screen and the emails your clients get.', false, 'Elite and up'],
    ],
    rows: [
      ['A business clients remember', 'Every workout, message and check-in happens under your name.', ['brand', 'message']],
      ['Set it once', 'Pick your colors and add your logo and name. The client app updates for everyone.', ['brand', 'setRow']],
    ],
    related: ['client-app', 'business', 'coaching'],
    faq: ['Is KOACH white-label?', 'Who owns my data?'],
  },
}

// Mega menu groups (Coach / Engage / Manage / Scale). extra = links that land on a home section.
export const GROUPS = [
  { id: 'coach', label: 'Coach', blurb: 'Plan training and nutrition', pages: ['coaching', 'nutrition'], preview: ['program', 'macros'] },
  { id: 'engage', label: 'Engage', blurb: 'Keep clients training and talking', pages: ['client-app', 'check-ins'], preview: ['setRow', 'checkin'] },
  { id: 'manage', label: 'Manage', blurb: 'Run the business side', pages: ['business'], extra: [['Run My Day', 'Who needs you today, by priority', '/#today']], preview: ['revenue', 'action'] },
  { id: 'scale', label: 'Scale', blurb: 'Grow under your own brand', pages: ['branding'], extra: [['Team', 'Invite coaches to your workspace', '/#pricing']], preview: ['brand', 'team'] },
]

export const featureUrl = (slug) => `/features/${slug}`
// home category grid (the four Everfit-style service categories)
export const CATEGORIES = ['coaching', 'nutrition', 'check-ins', 'client-app']
