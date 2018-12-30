import * as R from 'ramda'
import { createValidateFromRules } from '@frankmoney/forms'

const isFileLoading = R.propEq('loading', true)

const validateFilesIsLoaded = R.ifElse(
  R.any(isFileLoading),
  R.always('Images are processing'),
  R.always('')
)

const validations = {
  cover: [validateFilesIsLoaded],
}

export const validate = createValidateFromRules(validations)
