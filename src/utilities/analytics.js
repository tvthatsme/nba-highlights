/**
 * Send an event to Google Analytics
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 *
 * @param {Object} eventInfo
 * @param {String} eventInfo.category - The object that was interacted with
 * @param {String} eventInfo.action - The type of interaction
 * @param {String} eventInfo.label - Used for categorizing events
 */
export const trackEvent = ({ category, action, label }) => {
  // Don't track while developing
  if (process.env.NODE_ENV === 'production' && typeof ga === 'function') {
    window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    })
  }
}
