// @flow strict

export const parseQueryStringBool = (value?: string): ?boolean => {
  switch (value) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return null
  }
}

export const parseQueryStringNumber = (value?: string): ?number => {
  const number = parseInt(value, 10)
  return isNaN(number) ? null : number
}

export const parseQueryString = (value?: string): string =>
  value !== undefined ? value : ''
