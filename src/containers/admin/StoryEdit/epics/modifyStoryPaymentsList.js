import { fromJS } from 'immutable'
import { change } from 'redux-form/immutable'
import { FORM_NAME } from '../constants'
import ACTIONS from '../actions'
import { storySelectedPaymentsSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.modifyStoryPaymentsList)
    .mergeMap(({ payload: { newPayments, removeIds } }) => {
      const state = store.getState()
      const payments = storySelectedPaymentsSelector(state)
        .filter(x => !removeIds.includes(x.id))
        .concat(newPayments || [])

      return [change(FORM_NAME, 'payments', fromJS(payments))]
    })
