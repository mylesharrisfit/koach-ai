// Every link into the KOACH AI application is built here.
export const APP_URL = 'https://app.koachai.net'

export const LOGIN_URL = `${APP_URL}/login`

// plan: starter | pro | elite | enterprise   interval: monthly | annual
export const signupUrl = (plan, interval) =>
  `${APP_URL}/signup?plan=${plan}&interval=${interval}`
