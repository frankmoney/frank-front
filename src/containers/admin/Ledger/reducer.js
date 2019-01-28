import * as R from 'ramda'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { DEFAULT_DRAWER_PAYMENTS_PAGE_SIZE as PAGE_SIZE } from 'components/drawers/constants'
import CARD_ACTIONS from 'containers/admin/PaymentCard/actions'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminLedger'

const similarPaymentsDefaultState = {
  similarDrawerOpen: false,
  similarListLoading: false,
  similarListMoreLoading: false,
  similarPayments: [],
  similarTotalPagesCount: 0,
  similarLoadedPagesCount: 0,
}

const defaultState = fromJS({
  barsData: [],
  barsUnit: null,
  categories: [],
  loaded: false,
  loading: true,
  payments: [],
  paymentsCount: 0,
  pieData: null,
  typing: false,
  unfilteredCount: null,
  //
  ...similarPaymentsDefaultState,
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
          unfilteredCount,
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
        unfilteredCount: R.isNil(unfilteredCount)
          ? state.get('unfilteredCount')
          : unfilteredCount,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [CARD_ACTIONS.save.success]: (state, { payload: { payment, cascade } }) =>
      state
        .update('payments', list =>
          [payment, ...cascade].reduce((l, p) => {
            const idx = l.findIndex(x => x.get('id') === p.id)
            if (idx === -1) {
              return l
            }
            return l.update(idx, x => x.merge(p))
          }, list)
        )
        .set('lastCascadeCount', cascade.length),

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
    [ACTIONS.dismissCascadeSnackbar]: state =>
      state.merge({
        lastCascadeCount: 0,
      }),
    [ACTIONS.leave]: () => defaultState,

    // Similar payments
    [ACTIONS.openSimilarPaymentsDrawer]: state =>
      state.merge({
        similarDrawerOpen: true,
      }),
    [ACTIONS.closeSimilarPaymentsDrawer]: state =>
      state.merge({
        ...similarPaymentsDefaultState,
      }),
    [ACTIONS.loadSimilarPayments]: (state, { payload: totalCount }) =>
      state.merge({
        similarListLoading: true,
        similarLoadedPagesCount: 0,
        similarTotalPagesCount: Math.ceil(totalCount / PAGE_SIZE),
      }),
    [ACTIONS.loadSimilarPayments.success]: (state, { payload: payments }) =>
      state.merge({
        similarListLoading: false,
        similarPayments: fromJS(payments),
        similarLoadedPagesCount: 1,
      }),
    [ACTIONS.loadSimilarPayments.error]: state =>
      state.merge({
        similarListLoading: false,
      }),
    [ACTIONS.loadMoreSimilarPayments]: state =>
      state.merge({
        similarListMoreLoading: true,
      }),
    [ACTIONS.loadMoreSimilarPayments.success]: (state, { payload: payments }) =>
      state
        .merge({
          similarListMoreLoading: false,
        })
        .update('similarLoadedPagesCount', counter => counter + 1)
        .update('similarPayments', list => list.concat(fromJS(payments))),
    [ACTIONS.loadMoreSimilarPayments.error]: state =>
      state.merge({
        similarListMoreLoading: false,
      }),
    [ACTIONS.pastePayment.success]: (
      state,
      { payload: { paymentId, clipboard } }
    ) => {
      const payments = state.get('payments')
      return state.merge({
        payments: payments.update(
          payments.findIndex(item => item.get('id') === paymentId),
          item => item.merge(clipboard)
        ),
      })
    },
  },
  defaultState
)
