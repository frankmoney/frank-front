import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminWidget'

const defaultState = fromJS({
  position: 'right',
  scriptSrc: __WIDGET_SCRIPT_URL,
})

export default handleActions(
  {
    [ACTIONS.changePosition]: (state, { payload: position }) =>
      state.merge({ position }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
