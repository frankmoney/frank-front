import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { DEFAULT_DRAWER_PAYMENTS_PAGE_SIZE as PAGE_SIZE } from 'components/drawers/constants'
import ACTIONS from './actions'

export const REDUCER_KEY = 'publicPayment'

const initialState = fromJS({
  account: null,
  drawerOpen: false,
  isLoaded: false,
  isLoading: false,
  isPrivate: false,
  listLoading: false,
  listMoreLoading: false,
  loadedPagesCount: 0,
  payment: null,
  similarPayments: [],
  totalPagesCount: 0,
})

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        isLoading: true,
        isLoaded: false,
      }),
    [ACTIONS.load.success]: (state, { payload: { account, payment } }) =>
      state.merge({
        isLoading: false,
        isLoaded: true,
        account: fromJS(account),
        payment: fromJS(payment),
      }),
    [ACTIONS.load.error]: (state, { payload: isPrivate }) =>
      state.merge({
        isLoaded: false,
        isLoading: false,
        isPrivate,
      }),

    [ACTIONS.openDrawer]: state => state.merge({ drawerOpen: true }),
    [ACTIONS.closeDrawer]: state => state.merge({ drawerOpen: false }),
    [ACTIONS.loadSimilarPayments]: (state, { payload: totalCount }) =>
      state.merge({
        listLoading: true,
        loadedPagesCount: 0,
        totalPagesCount: Math.ceil(totalCount / PAGE_SIZE),
      }),
    [ACTIONS.loadSimilarPayments.success]: (state, { payload: payments }) =>
      state.merge({
        listLoading: false,
        similarPayments: fromJS(payments),
        loadedPagesCount: 1,
      }),
    [ACTIONS.loadSimilarPayments.error]: state =>
      state.merge({
        listLoading: false,
      }),
    [ACTIONS.loadMoreSimilarPayments]: state =>
      state.merge({
        listMoreLoading: true,
      }),
    [ACTIONS.loadMoreSimilarPayments.success]: (state, { payload: payments }) =>
      state
        .merge({
          listMoreLoading: false,
        })
        .update('loadedPagesCount', counter => counter + 1)
        .update('similarPayments', list => list.concat(fromJS(payments))),
    [ACTIONS.loadMoreSimilarPayments.error]: state =>
      state.merge({
        listMoreLoading: false,
      }),

    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
