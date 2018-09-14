// TODO works in browser ONLY! use unversal-url
export const getHostname = url => {
  try {
    return new URL(url).hostname
  } catch (err) {
    return url
  }
}
