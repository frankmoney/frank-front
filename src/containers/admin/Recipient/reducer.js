import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'recipient'

const defaultState = Immutable.fromJS({
  loading: true,
  loaded: false,
  updatingList: false,
  updatingRecipient: false,
  categories: null,
  recipient: null,
  paymentCount: 0,
  payments: null,
})

export default handleActions(
  {
    [ACTIONS.load]: (state, { payload: { updateListOnly } }) =>
      state.merge(updateListOnly ? { updatingList: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      { payload: { categories, recipient, payments, paymentCount } }
    ) =>
      state.merge({
        loading: false,
        loaded: true,
        updatingList: false,
        categories,
        recipient: fromJS(recipient),
        payments: fromJS(payments),
        paymentCount,
      }),
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.editName]: state => state.merge({ updatingRecipient: true }),
    [ACTIONS.editName.success]: (
      state,
      {
        payload: {
          recipient: { name },
        },
      }
    ) => state.setIn(['recipient', 'name'], name),
    [ACTIONS.editName.error]: state =>
      state.merge({ updatingRecipient: false }),
    [ACTIONS.leave]: () => defaultState,

    [MULTI_ACTIONS.updateSuccess]: (state, { payload: { payments } }) =>
      state.update('payments', list =>
        payments.reduce((l, p) => {
          const idx = l.findIndex(x => x.get('id') === p.id)
          if (idx === -1) {
            return l
          }
          return l.update(idx, x => x.merge(p))
        }, list)
      ),
  },
  defaultState
)
