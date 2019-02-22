/**
 * Take a date object and create a nicely formatted string
 * Exmaple: 20190131 becomes January 31st, 2019
 *
 * @param {String} date
 */
export const formatDate = date => {
  // Get the year and the day from the date string
  const year = date.substring(0, 4)
  const day = parseInt(date.substring(6, 8), 10)

  // Get the full name of the month
  const locale = 'en-us'
  const monthIndex = parseInt(date.substring(4, 6), 10) - 1
  const dateObject = new Date(year, monthIndex, day)
  const month = dateObject.toLocaleString(locale, {
    month: 'long',
  })

  // Figure out the ordinal part of the date
  const ordinal = day % 10
  let ordinalString = 'th'
  if (ordinal === 1) {
    ordinalString = 'st'
  } else if (ordinal === 2) {
    ordinalString = 'nd'
  } else if (ordinal === 3) {
    ordinalString = 'rd'
  }

  return `${month} ${day}${ordinalString}, ${year}`
}
