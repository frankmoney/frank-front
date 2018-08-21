import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { PAGE_SIZE } from './constants'

export const REDUCER_KEY = 'storyEdit'

const initialState = fromJS({
  loading: true,
  loaded: false,
  paymentsListLoading: false,
  story: {},
  payments: [],
  paymentsLoadedPagesCount: 0,
})

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        loading: true,
        loaded: false,
      }),
    [ACTIONS.load.success]: (
      state,
      { payload: { story, payments, totalCount } }
    ) =>
      state.merge({
        loading: false,
        loaded: true,
        story: fromJS(story),
        payments: fromJS(payments),
        paymentsLoadedPagesCount: 1,
        paymentsTotalPagesCount: Math.ceil(totalCount / PAGE_SIZE),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        loaded: false,
      }),
    [ACTIONS.loadMorePayments]: state =>
      state.merge({
        paymentsListLoading: true,
      }),
    [ACTIONS.loadMorePayments.success]: (state, { payload: { payments } }) =>
      state
        .merge({
          paymentsListLoading: false,
        })
        .update('paymentsLoadedPagesCount', counter => counter + 1)
        .update('payments', list => list.concat(fromJS(payments))),
    [ACTIONS.loadMorePayments.error]: state =>
      state.merge({
        paymentsListLoading: false,
      }),
  },
  initialState
)
