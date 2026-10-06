// Every link into the KOACH application is built here.
export const APP_URL = 'https://app.koachai.net'
export const LOGIN_URL = `${APP_URL}/login`
export const SIGNUP_URL = `${APP_URL}/signup`

// plan: starter | pro | elite | enterprise   interval: monthly | yearly
export const signupUrl = (plan, interval) => `${SIGNUP_URL}?plan=${plan}&interval=${interval}`

export const SUPPORT_EMAIL = 'support@koachai.net'
export const INSTAGRAM_URL = 'https://www.instagram.com/koachaiapp'
