import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'publicStory'

const initialState = fromJS({
  account: null,
  isLoaded: false,
  isLoading: false,
  isNotFound: false,
  story: null,
  isLoadFailed: false,
})

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        isLoading: true,
        isLoaded: false,
      }),
    [ACTIONS.load.success]: (state, { payload: { account, story } }) =>
      state.merge({
        isLoading: false,
        isLoaded: true,
        account: fromJS(account),
        story: fromJS(story),
      }),
    [ACTIONS.load.error]: (state, { payload: { notFound } }) =>
      state.merge({
        isLoaded: false,
        isLoading: false,
        isNotFound: notFound,
        isLoadFailed: !notFound,
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
