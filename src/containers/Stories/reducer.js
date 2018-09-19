import storage from 'local-storage-fallback'
import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { UI_FLAGS } from '../../const'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'stories'

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
      const { host } = window.location
      const publishedStoryUrl =
        host + storage.getItem(UI_FLAGS.lastPublishedStoryUrl)
      // storage.removeItem(UI_FLAGS.lastPublishedStoryUrl)

      return state.merge({
        loading: false,
        loaded: true,
        stories: fromJS(stories),
        storiesCount: totalCount,
        shareDialogIsOpen: !!publishedStoryUrl,
        shareDialogUrl: publishedStoryUrl,
      })
    },
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
