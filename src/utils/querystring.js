export const parseQueryStringBool = value => {
  switch (value) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return null
  }
}

export const parseQueryStringNumber = value => {
  const number = parseInt(value, 10)
  return isNaN(number) ? null : number
}

export const parseQueryString = value => (value !== undefined ? value : '')
