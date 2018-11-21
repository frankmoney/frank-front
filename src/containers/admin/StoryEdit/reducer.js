import storage from 'local-storage-fallback'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { createRouteUrl } from '@frankmoney/utils'
import { LS_FLAGS, ROUTES } from 'const'
import ACTIONS from './actions'
import { PAGE_SIZE } from './constants'

export const REDUCER_KEY = 'adminStoryEdit'

const initialState = fromJS({
  loading: true,
  loaded: false,
  paymentsListLoading: false,
  paymentsListMoreLoading: false,
  paymentsDrawerOpen: false,
  saving: false,
  processing: false,
  saved: false,
  story: null,
  payments: [],
  paymentsLoadedPagesCount: 0,
  paymentsFilterDateMin: null,
  paymentsFilterDateMax: null,
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
        saved: story && story.pid,
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
    [ACTIONS.openPaymentsDrawer]: state =>
      state.merge({ paymentsDrawerOpen: true }),
    [ACTIONS.closePaymentsDrawer]: state =>
      state.merge({ paymentsDrawerOpen: false }),
    [ACTIONS.filterPayments]: (
      state,
      { payload: { from: dateMin, to: dateMax } }
    ) =>
      state.merge({
        paymentsListLoading: true,
        paymentsLoadedPagesCount: 0,
        paymentsFilterDateMin: dateMin,
        paymentsFilterDateMax: dateMax,
      }),
    [ACTIONS.filterPayments.success]: (
      state,
      { payload: { payments, totalCount } }
    ) =>
      state.merge({
        paymentsListLoading: false,
        payments: fromJS(payments),
        paymentsLoadedPagesCount: 1,
        paymentsTotalPagesCount: Math.ceil(totalCount / PAGE_SIZE),
      }),
    [ACTIONS.filterPayments.error]: state =>
      state.merge({
        paymentsListLoading: false,
      }),
    [ACTIONS.loadMorePayments]: state =>
      state.merge({
        paymentsListMoreLoading: true,
      }),
    [ACTIONS.loadMorePayments.success]: (state, { payload: payments }) =>
      state
        .merge({
          paymentsListMoreLoading: false,
        })
        .update('paymentsLoadedPagesCount', counter => counter + 1)
        .update('payments', list => list.concat(fromJS(payments))),
    [ACTIONS.loadMorePayments.error]: state =>
      state.merge({
        paymentsListMoreLoading: false,
      }),
    [ACTIONS.createOrUpdate]: state =>
      state.merge({
        saving: true,
      }),
    [ACTIONS.createOrUpdate.success]: (state, { payload: { story } }) =>
      state.merge({
        saving: false,
        saved: !!story,
        story: fromJS(story),
      }),
    [ACTIONS.createOrUpdate.error]: state =>
      state.merge({
        saving: false,
      }),
    [ACTIONS.publish]: state =>
      state.merge({
        processing: true,
      }),
    [ACTIONS.publish.success]: (state, { payload: { story } }) => {
      if (story.draft.published) {
        const publicUrl = createRouteUrl(ROUTES.public.story.root, {
          accountId: 'FIXME', // TODO: pass correct account id
          storyId: story.pid,
        })
        storage.setItem(LS_FLAGS.lastPublishedStoryUrl, publicUrl)
      }
      return state.merge({
        processing: false,
      })
      // .mergeIn(['story', 'isPublished'], story.isPublished)
      // .mergeIn(['story', 'hasUnpublishedDraft'], story.hasUnpublishedDraft)
    },
    [ACTIONS.publish.error]: state =>
      state.merge({
        processing: false,
      }),
    [ACTIONS.unpublish]: state =>
      state.merge({
        processing: true,
      }),
    [ACTIONS.unpublish.success]: (state, { payload: { story } }) =>
      state.merge({
        processing: false,
        story: fromJS(story),
      }),
    [ACTIONS.unpublish.error]: state =>
      state.merge({
        processing: false,
      }),
    [ACTIONS.delete]: state =>
      state.merge({
        processing: true,
      }),
    [ACTIONS.delete.success]: state =>
      state.merge({
        processing: false,
      }),
    [ACTIONS.delete.error]: state =>
      state.merge({
        processing: false,
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
