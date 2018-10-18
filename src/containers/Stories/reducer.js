import storage from 'local-storage-fallback'
import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { LS_FLAGS } from 'const'
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
  storyDeletedSnackBarIsOpen: false,
})

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true }),
    [ACTIONS.load.success]: (state, { payload: { stories, totalCount } }) => {
      // Check local storage if there was story which was published recently

      const { host } = window.location
      const publishedStoryUrl =
        host + storage.getItem(LS_FLAGS.lastPublishedStoryUrl)
      const shareDialogIsOpen = !!storage.getItem(
        LS_FLAGS.lastPublishedStoryUrl
      )
      storage.removeItem(LS_FLAGS.lastPublishedStoryUrl)

      // Check local storage if there was story which was deleted recently

      const storyDeletedSnackBarIsOpen = !!storage.getItem(
        LS_FLAGS.selectedStoryWasDeleted
      )
      storage.removeItem(LS_FLAGS.selectedStoryWasDeleted)

      return state.merge({
        loading: false,
        loaded: true,
        stories: fromJS(stories),
        storiesCount: totalCount,
        shareDialogIsOpen,
        shareDialogUrl: publishedStoryUrl,
        storyDeletedSnackBarIsOpen,
      })
    },
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.toggleShareDialog]: state =>
      state.merge({ shareDialogIsOpen: false }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
