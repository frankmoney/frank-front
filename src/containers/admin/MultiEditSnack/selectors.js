import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { isDirty } from 'redux-form/immutable'
import pluralize from 'utils/pluralize'
import { getFormName } from '../PaymentCard/const'
import { FORM_NAME } from './const'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => state => state.getIn([REDUCER_KEY, ...prop])

export const publishDialogOpen = get('publishDialogOpen')
export const editDialogOpen = get('editDialogOpen')
export const status = get('status')
export const isUpdating = createSelector(status, R.equals('updating'))
export const isError = createSelector(status, R.equals('error'))
export const isSuccess = createSelector(status, R.equals('done'))
export const updateCompleted = createSelector(isError, isSuccess, R.or)
export const payments = createPlainObjectSelector(get('payments'))
export const paymentIds = createSelector(payments, R.map(R.prop('id')))

export const paymentsCount = createSelector(payments, R.length)
export const hasPayments = createSelector(paymentsCount, c => c > 0)
export const selectionSnackShown = createSelector(
  updateCompleted,
  hasPayments,
  (updated, hasPayments) => !updated && hasPayments
)

export const resultSnackShown = createSelector(
  updateCompleted,
  hasPayments,
  (updated, hasPayments) => updated && hasPayments
)

export const publishValue = createSelector(
  payments,
  R.pipe(
    R.map(R.prop('verified')),
    R.cond([
      [R.all(R.equals(true)), R.always(false)],
      [R.all(R.equals(false)), R.always(true)],
    ]),
    R.defaultTo(null)
  )
)
export const canPublish = createSelector(publishValue, R.equals(true))
export const canUnpublish = createSelector(publishValue, R.equals(false))

const FORM_VALUES = {
  categoryId: R.path(['category', 'id']),
  peerName: R.path(['peer', 'name']),
  description: R.prop('description'),
}

const returnIfAllEquals = list =>
  R.all(R.equals(list[0]), list) ? list[0] : null

export const initialFormValues = createSelector(
  payments,
  R.converge(
    Object.assign,
    R.toPairs(FORM_VALUES).map(([prop, getter]) =>
      R.pipe(
        R.map(getter),
        returnIfAllEquals,
        R.objOf(prop)
      )
    )
  )
)

export const categoryType = createSelector(
  payments,
  R.cond([
    [R.all(R.propSatisfies(x => x > 0, 'amount')), R.always('income')],
    [R.all(R.propSatisfies(x => x < 0, 'amount')), R.always('spending')],
    [R.T, R.always('mixed')],
  ])
)

const isDirtyField = field => state => isDirty(FORM_NAME)(state, [field])

export const updateForecastMessage = createSelector(
  paymentsCount,
  isDirtyField('categoryId'),
  isDirtyField('peerName'),
  isDirtyField('description'),
  (count, ...dirtyFlags) => {
    const dirtyCount = dirtyFlags.filter(x => !!x).length

    return dirtyCount
      ? `${pluralize('field', dirtyCount)} will be updated in ${pluralize(
          'payment',
          count
        )}`
      : ''
  }
)
