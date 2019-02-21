exports.onClientEntry = () => {
  require.ensure(['@sentry/browser'], function(require) {
    const Sentry = require('@sentry/browser')
    Sentry.init({
      dsn: process.env.GATSBY_SENTRY_DSN_URL,
      environment: process.env.NODE_ENV,
      enabled: () => process.env.NODE_ENV === 'production',
    })
    window.Sentry = Sentry
  })
}
