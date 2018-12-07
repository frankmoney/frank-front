import { Set, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminLedger'

const defaultState = fromJS({
  typing: false,
  loading: true,
  loaded: false,
  categories: [],
  barsData: [],
  barsUnit: null,
  pieData: null,
  paymentsCount: 0,
  payments: [],
  paymentIdsSaving: Set(),
  paymentIdsPublishing: Set(),
})

export default handleActions(
  {
    [ACTIONS.searchTyping]: state => state.merge({ typing: true }),
    [ACTIONS.load]: (state, { payload: { updateListOnly } }) =>
      state.merge(updateListOnly ? { updatingList: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      {
        payload: {
          barChart,
          barsUnit,
          categories,
          payments,
          pieChart,
          totalCount,
        },
      }
    ) =>
      state.merge({
        loading: false,
        typing: false,
        loaded: true,
        updatingList: false,
        categories: categories ? fromJS(categories) : state.get('categories'),
        payments: fromJS(payments),
        barsData: fromJS(barChart || []),
        barsUnit,
        pieData: fromJS(pieChart),
        paymentsCount: totalCount,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [ACTIONS.paymentUpdate]: (
      state,
      { payload: { publish, unpublish, paymentId } }
    ) =>
      state.updateIn(
        [publish || unpublish ? 'paymentIdsPublishing' : 'paymentIdsSaving'],
        set => set.add(paymentId)
      ),
    [ACTIONS.paymentUpdate.success]: (state, { payload: { id, ...payment } }) =>
      state
        .updateIn(['paymentIdsSaving'], set => set.delete(id))
        .updateIn(['paymentIdsPublishing'], set => set.delete(id))
        .update('payments', list => {
          const idx = list.findIndex(x => x.get('id') === id)
          if (idx === -1) {
            return list
          }
          return list.update(idx, x => x.merge(payment))
        }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
