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
  saving: false,
  processing: false,
  saved: false,
  story: null,
})

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        loading: true,
        loaded: false,
      }),
    [ACTIONS.load.success]: (state, { payload: { story } }) =>
      state.merge({
        loading: false,
        loaded: true,
        saved: story && story.id,
        story: fromJS(story),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        loaded: false,
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
    [ACTIONS.publish.success]: (state, { payload: { accountId, story } }) => {
      if (story.draft.published) {
        const publicUrl = createRouteUrl(ROUTES.public.story.idRoot, {
          accountId,
          storyId: story.id,
        })
        storage.setItem(LS_FLAGS.lastPublishedStoryUrl, publicUrl)
      }
      return state.merge({
        processing: false,
      })
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
