import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminWidget'

const defaultState = fromJS({
  position: 'left',
  // scriptSrc: 'https://assets2.frank.ly/widget/main.js',
  scriptSrc: 'http://0.0.0.0:8082/assets/main.js',
  // scriptSrc:
  //   'https://storage.googleapis.com/frank-dev-assets/frank/widget/main.js',
})

export default handleActions(
  {
    [ACTIONS.changePosition]: (state, { payload: position }) =>
      state.merge({ position }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
