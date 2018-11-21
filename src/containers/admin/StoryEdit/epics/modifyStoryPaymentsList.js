import { fromJS } from 'immutable'
import { change } from 'redux-form/immutable'
import { FORM_NAME } from '../constants'
import ACTIONS from '../actions'
import { paymentsSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.modifyStoryPaymentsList)
    .mergeMap(({ payload: ids }) => {
      const state = store.getState()
      const payments = paymentsSelector(state)
      const newPayments = payments.filter(x => ids.includes(x.id))

      return [change(FORM_NAME, 'payments', fromJS(newPayments))]
    })
