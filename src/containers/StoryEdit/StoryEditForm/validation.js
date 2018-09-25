import * as R from 'ramda'
import { createValidateFromRules, minItems, required } from '@frankmoney/forms'

const isFileLoading = R.propEq('loading', true)

const validateFilesIsLoaded = R.ifElse(
  R.any(isFileLoading),
  R.always('Images are processing'),
  R.always('')
)

const validations = {
  payments: [required, minItems(1)],
  coverImage: [validateFilesIsLoaded],
}

export const validate = createValidateFromRules(validations)
