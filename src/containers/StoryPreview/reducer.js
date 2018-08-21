import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'storyPreview'

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  story: null,
})

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        isLoading: true,
        isLoaded: false,
      }),
    [ACTIONS.load.success]: (state, { payload }) =>
      state.merge({
        isLoading: false,
        isLoaded: true,
        story: fromJS(payload),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        isLoading: false,
        isLoaded: false,
      }),
  },
  initialState
)
