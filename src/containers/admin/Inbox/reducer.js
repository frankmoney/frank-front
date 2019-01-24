import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import CARD_ACTIONS from 'containers/admin/PaymentCard/actions'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminInbox'

const defaultState = fromJS({
  loading: false,
  loaded: false,
  payments: [],
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
    [CARD_ACTIONS.save.success]: (
      state,
      { payload: { payment, cascade = [] } }
    ) =>
      state.update('payments', list =>
        [payment, ...cascade].reduce((l, p) => {
          const idx = l.findIndex(x => x.get('id') === p.id)
          if (idx === -1) {
            return l
          }
          return l.update(idx, x => x.merge(p))
        }, list)
      ),
    [MULTI_ACTIONS.updateSuccess]: (
      state,
      { payload: { payments, cascade = [] } }
    ) =>
      state.update('payments', list =>
        [...payments, ...cascade].reduce((l, p) => {
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
