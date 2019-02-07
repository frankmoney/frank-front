import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminWidget'

const defaultState = fromJS({
  position: 'right',
  widgetType: 'button',
  color: 'dark',
  scriptSrc: __WIDGET_SCRIPT_URL,
  size: { width: 625, height: 400 },
})

export default handleActions(
  {
    [ACTIONS.changePosition]: (state, { payload: position }) =>
      state.merge({ position }),
    [ACTIONS.changeType]: (state, { payload: widgetType }) =>
      state.merge({ widgetType }),
    [ACTIONS.changeSize]: (state, { payload: size }) => state.merge({ size }),
    [ACTIONS.changeColor]: (state, { payload: color }) =>
      state.merge({ color }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
