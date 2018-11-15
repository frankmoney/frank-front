import * as R from 'ramda'
import { fromJS } from 'immutable'
import { change } from 'redux-form/immutable'
import { FORM_NAME } from '../constants'
import ACTIONS from '../actions'

const sortByPostedDateAsc = R.sort(
  (payment, nextPayment) => payment.postedDate < nextPayment.postedDate
)

export default action$ =>
  action$
    .ofType(ACTIONS.modifyStoryPaymentsList)
    .mergeMap(({ payload }) => [
      change(FORM_NAME, 'payments', fromJS(sortByPostedDateAsc(payload))),
    ])
