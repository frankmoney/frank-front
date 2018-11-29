import { Set, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminInbox'

const defaultState = fromJS({
  loading: false,
  loaded: false,
  payments: [],
  paymentIdsSaving: Set(),
  paymentIdsPublishing: Set(),
})

export default handleActions(
  {
    [ACTIONS.load]: (state, { payload: { updateListOnly } }) =>
      state.merge(updateListOnly ? { updatingList: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      { payload: { payments, categories, totalCount } }
    ) =>
      state.merge({
        loading: false,
        typing: false,
        loaded: true,
        updatingList: false,
        categories: categories ? fromJS(categories) : state.get('categories'),
        payments: fromJS(payments),
        paymentsCount: totalCount,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [ACTIONS.paymentSave]: (state, { payload: { paymentId } }) =>
      state.updateIn(['paymentIdsSaving'], set => set.add(paymentId)),
    [ACTIONS.paymentSave.success]: (state, { payload: { id, ...payment } }) =>
      state
        .updateIn(['paymentIdsSaving'], set => set.delete(id))
        .update('payments', list => {
          const idx = list.findIndex(x => x.get('id') === id)
          if (idx === -1) {
            return list
          }
          return list.update(idx, x => x.merge(payment))
        }),
    [ACTIONS.paymentPublish]: (state, { payload: { paymentId } }) =>
      state.updateIn(['paymentIdsPublishing'], set => set.add(paymentId)),
    [ACTIONS.paymentPublish.success]: (state, { payload: { id } }) =>
      state
        .updateIn(['paymentIdsPublishing'], set => set.delete(id))
        .update('payments', list => list.filter(x => x.get('id') !== id)),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
