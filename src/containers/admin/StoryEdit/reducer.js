import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { createRouteUrl } from '@frankmoney/utils'
import { LS_FLAGS, ROUTES } from 'const'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminStoryEdit'

const initialState = fromJS({
  loading: true,
  loaded: false,
  saving: 0,
  deleting: false,
  story: null,
  publishOrUnpublishConfirmDialogShown: false,
  deleteConfirmDialogShown: false,
  canNotPublishSnackShown: false,
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
        story: fromJS(story),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        loaded: false,
      }),
    [ACTIONS.showPublishOrUnpublishConfirmDialog]: (
      state,
      { payload: { show } }
    ) => state.merge({ publishOrUnpublishConfirmDialogShown: show }),
    [ACTIONS.showDeleteConfirmDialog]: (state, { payload: { show } }) =>
      state.merge({ deleteConfirmDialogShown: show }),
    [ACTIONS.showCanNotPublishSnack]: (state, { payload: { show } }) =>
      state.merge({ canNotPublishSnackShown: show }),
    [ACTIONS.createOrUpdate]: (state, { payload: { mode } }) =>
      state.merge({
        saving: mode,
        canNotPublishSnackShown: false,
      }),
    [ACTIONS.createOrUpdate.success]: (
      state,
      { payload: { accountId, story } }
    ) => {
      return state.merge({
        saving: 0,
        story: fromJS(story),
        publishOrUnpublishConfirmDialogShown: false,
      })
    },
    [ACTIONS.createOrUpdate.error]: state =>
      state.merge({
        saving: 0,
        publishOrUnpublishConfirmDialogShown: false,
      }),
    [ACTIONS.delete]: state =>
      state.merge({
        deleting: true,
      }),
    [ACTIONS.delete.success]: state =>
      state.merge({
        deleting: false,
        deleteConfirmDialogShown: false,
      }),
    [ACTIONS.delete.error]: state =>
      state.merge({
        deleting: false,
        deleteConfirmDialogShown: false,
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
