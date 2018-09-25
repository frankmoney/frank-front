import storage from 'local-storage-fallback'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { createRouteUrl } from '@frankmoney/utils'
import { LS_FLAGS, ROUTES } from 'const'
import ACTIONS from './actions'
import { PAGE_SIZE } from './constants'

export const REDUCER_KEY = 'storyEdit'

const initialState = fromJS({
  loading: true,
  loaded: false,
  paymentsListLoading: false,
  saving: false,
  processing: false,
  saved: false,
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
        saved: !!story,
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
      if (story.isPublished) {
        storage.setItem(
          LS_FLAGS.lastPublishedStoryUrl,
          createRouteUrl(ROUTES.stories.storyPreview, { id: story.id })
        )
      }
      return state
        .merge({
          processing: false,
        })
        .mergeIn(['story', 'isPublished'], story.isPublished)
        .mergeIn(['story', 'hasUnpublishedDraft'], story.hasUnpublishedDraft)
    },
    [ACTIONS.publish.error]: state =>
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
