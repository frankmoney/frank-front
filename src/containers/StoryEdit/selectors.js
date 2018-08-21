import * as R from 'ramda'
import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form/immutable'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'
import { FORM_NAME } from './constants'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const storySelector = createPlainObjectSelector(get('story'))

export const formInitialValuesSelector = createSelector(
  storySelector,
  R.ifElse(
    R.complement(R.isNil),
    event => {
      const values = R.pick(['coverImage', 'title', 'description', 'payments'])(
        event
      )

      if (!values.coverImage) {
        values.coverImage = []
      } else {
        values.coverCrop =
          values.coverImage.crop && values.coverImage.crop.default
        values.coverImage = [values.coverImage]
      }

      if (!values.payments) {
        values.payments = []
      }

      return values
    },
    () => ({
      payments: [],
      coverImage: [],
    })
  )
)

const storyEditFormValueSelector = formValueSelector(FORM_NAME)

export const storySelectedPaymentsSelector = createPlainObjectSelector(state =>
  storyEditFormValueSelector(state, 'payments')
)

export const paymentsLoadedPagesCounterSelector = get(
  'paymentsLoadedPagesCount'
)

export const paymentsTotalPagesCounterSelector = get('paymentsTotalPagesCount')

export const paymentsListUpdatingSelector = get('paymentsListLoading')

export const paymentsSelector = createPlainObjectSelector(get('payments'))
