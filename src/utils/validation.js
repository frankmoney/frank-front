import { Map } from 'immutable'
import validator from 'validator'
import TinyMask from 'tinymask'
import {
  keys,
  every,
  entries,
  fromPairs,
  compact,
  first,
  isNumber,
} from 'lodash'

/*
* formatInteger: "–" sign should be used by design (instead of default "-")
*/
const formatInteger = integer => {
  const absValue = Math.abs(integer)
  const isNegative = integer < 0
  return isNegative ? `–${absValue}` : absValue
}

export const required = value => (value ? undefined : 'Required')

export const numberIsRequired = value =>
  isNumber(value) ? undefined : 'Number is required'

export const minItems = minAllowedLength => value => {
  const count = (value ? value.length || value.size : 0) || 0 // immutable-js fallback, silly duck typing
  const leftCount = minAllowedLength - count
  const isMoreOrEqual = count >= minAllowedLength

  return isMoreOrEqual
    ? undefined
    : `At least ${leftCount} more item${leftCount > 1 ? 's' : ''}`
}

export const minLength = minAllowedLength => value => {
  const leftCount = minAllowedLength - (value || '').length

  return (
    leftCount > 0 &&
    `At least ${leftCount} more symbol${leftCount > 1 ? 's' : ''}`
  )
}

export const maxLength = maxAllowedLength => value =>
  (value || '').length <= maxAllowedLength
    ? undefined
    : `${formatInteger(maxAllowedLength - (value || '').length)} symbols left`

export const maxWords = maxAllowedWords => value => {
  const words = (value || '').match(/\S+/g) || []

  return words.length <= maxAllowedWords
    ? undefined
    : `${formatInteger(maxAllowedWords - words.length)} words left`
}

export const email = (value = '') =>
  value && !validator.isEmail(value) && 'Wrong format'

export const url = (value = '') =>
  value && !validator.isURL(value) && 'Wrong format'

export const mask = maskValue => {
  const tinyMask = new TinyMask(maskValue)

  return (str = '') =>
    str && tinyMask.mask(str).length !== maskValue.length && 'Wrong format'
}

export const confirmation = (fieldName, errorMsg) => (value, allValues) =>
  allValues &&
  value !== allValues.get(fieldName) &&
  (errorMsg || `Does not match ${fieldName}`)

export const when = (fieldNameOrPredicate, validatorFn) => (value, allValues) =>
  allValues &&
  // eslint-disable-next-line no-nested-ternary
  (typeof fieldNameOrPredicate === 'function'
    ? fieldNameOrPredicate(
        typeof allValues.toJS === 'function' ? allValues.toJS() : allValues
      )
    : allValues instanceof Map
      ? allValues.get(fieldNameOrPredicate)
      : allValues[fieldNameOrPredicate]) &&
  validatorFn(value, allValues)

export const testValue = (value, rules, allValues) =>
  !rules ||
  // no rules
  !rules.length ||
  // no errors
  rules.filter(hasError => !!hasError(value, allValues)).length === 0

export const testObject = (testee, fieldRules) =>
  every(keys(fieldRules), fieldName =>
    testValue(testee[fieldName], fieldRules[fieldName])
  )

// составляет функцию валидатор для обьекта на основе правил {field: [rule1, rule2,...]}
// возвращает {field: "first error"}
export const createValidateFromRules = rules => values => {
  const valuesObj = values.toJS()
  return fromPairs(
    entries(rules)
      .map(([field, fieldRules]) => [
        field,
        first(
          compact(
            fieldRules.map(validate => validate(valuesObj[field], valuesObj))
          )
        ),
      ])
      .filter(([, error]) => !!error)
  )
}

// export const youtubeUrl = (value = '') =>
//   value && !checkYoutubeUrl(value) && 'Wrong Youtube URL format'
