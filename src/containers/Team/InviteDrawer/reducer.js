import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { REDUCER_NAME } from './constants'

const initialState = fromJS({
  loaded: false,
  loading: false,
  accessItems: null,
})

const teamReducer = handleActions(
  {
    [ACTIONS.load]: () =>
      fromJS({
        loaded: true,
        loading: false,
        accessItems: [
          { id: '1', name: 'Charity water' },
          { id: '2', name: 'Frank Money Inc' },
          { id: '3', name: 'Friends of Frank' },
          { id: '4', name: 'Team One Limited' },
          { id: '5', name: 'Bystrov Tochka' },
        ],
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
