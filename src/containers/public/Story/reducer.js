import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'publicStory'

const initialState = fromJS({
  account: null,
  isLoaded: false,
  isLoading: false,
  isPrivate: false,
  story: null,
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
    [ACTIONS.load.error]: (state, { payload: isPrivate }) =>
      state.merge({
        isLoaded: false,
        isLoading: false,
        isPrivate,
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
