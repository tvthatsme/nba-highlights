/**
 * Decode text for readability
 *
 * @param {string} text - The string to decode
 */
export const decodeText = text => {
  return text
    .replace(/&amp;/g, `&`)
    .replace(/&gt;/g, `>`)
    .replace(/&lt;/g, `<`)
    .replace(/&#39;/g, `'`)
    .replace(/&quot;/g, `"`)
}
