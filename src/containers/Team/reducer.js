import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { PROFILES, REDUCER_NAME } from './constants'

const initialState = fromJS({
  loaded: false,
  loading: false,
  profiles: null,
  ownProfileId: null,
  otherProfileIds: null,
})

const teamReducer = handleActions(
  {
    [ACTIONS.load]: () => {
      console.warn('load:', { ...PROFILES })
      return fromJS({
        loaded: true,
        loading: false,
        profiles: { ...PROFILES },
        ownProfileId: '59',
        otherProfileIds: Object.keys(PROFILES).filter(({ id }) => id !== '59'),
      })
    },
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
