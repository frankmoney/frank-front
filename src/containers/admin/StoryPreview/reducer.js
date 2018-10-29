import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminStoryPreview'

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
    [ACTIONS.load.success]: (state, { payload: { story } }) =>
      state.merge({
        isLoading: false,
        isLoaded: true,
        story: fromJS(story),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        isLoading: false,
        isLoaded: false,
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
