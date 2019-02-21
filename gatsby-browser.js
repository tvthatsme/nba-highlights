// import * as Sentry from '@sentry/browser'

exports.onClientEntry = () => {
  const Sentry = require('@sentry/browser')
  Sentry.init({
    dsn: process.env.GATSBY_SENTRY_DSN_URL,
    environment: process.env.NODE_ENV,
    enabled: () => process.env.NODE_ENV === 'production',
  })
  window.Sentry = Sentry
}
