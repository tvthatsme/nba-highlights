/**
 * Take a date object and create a nicely formatted string
 * Exmaple: January 31st, 2019
 *
 * @param {Date} date
 */
export const formatDate = date => {
  const locale = 'en-us'
  const year = date.getFullYear()
  const day = date.getDate()
  const month = date.toLocaleString(locale, {
    month: 'long',
  })
  // TODO: add the 'st', 'nd', 'rd', 'th' to the day
  return `${month} ${day}, ${year}`
}
