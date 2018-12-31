import storage from 'local-storage-fallback'
import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { LS_FLAGS } from 'const'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminStories'

const defaultState = Immutable.fromJS({
  loading: true,
  loaded: false,
  filtersEdit: {
    open: false,
    loaded: false,
    data: {},
  },
  stories: [],
  storiesCount: 0,
  shareDialogIsOpen: false,
  shareDialogUrl: null,
})

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true }),
    [ACTIONS.load.success]: (state, { payload: { stories, totalCount } }) => {
      const { protocol, host } = window.location
      const relativeUrl = storage.getItem(LS_FLAGS.lastPublishedStoryUrl)
      const publishedStoryUrl = `${protocol}//${host}${relativeUrl}`
      const shareDialogIsOpen = !!relativeUrl
      storage.removeItem(LS_FLAGS.lastPublishedStoryUrl)

      return state.merge({
        loading: false,
        loaded: true,
        stories: fromJS(stories),
        storiesCount: totalCount,
        shareDialogIsOpen,
        shareDialogUrl: publishedStoryUrl,
      })
    },
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.toggleShareDialog]: state =>
      state.merge({ shareDialogIsOpen: false }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
