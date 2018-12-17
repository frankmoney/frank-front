import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import CARD_ACTIONS from 'containers/admin/PaymentCard/actions'
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
    [CARD_ACTIONS.save.success]: (state, { payload: { payment, cascade } }) =>
      state.update('payments', list =>
        [payment, ...cascade].reduce((l, p) => {
          const idx = l.findIndex(x => x.get('id') === p.id)
          if (idx === -1) {
            return l
          }
          return l.update(idx, x => x.merge(p))
        }, list)
      ),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
