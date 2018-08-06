import { fromJS } from 'immutable'
import * as R from 'ramda'
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
    // [ACTIONS.load]: () =>
    //   fromJS({
    //     loaded: true,
    //     loading: false,
    //     profiles: { ...PROFILES },
    //     ownProfileId: '59',
    //     otherProfileIds: Object.keys(PROFILES).filter(({ id }) => id !== '59'),
    //   }),
    [ACTIONS.load]: state => state.merge({ loaded: false, loading: true }),
    [ACTIONS.load.error]: state =>
      state.merge({ loaded: false, loading: false }),
    [ACTIONS.load.success]: (state, { payload: { self, others } }) =>
      state.merge({
        loaded: true,
        loading: false,
        profiles: R.fromPairs([self, ...others].map(x => [x.id, x])),
        ownProfileId: self.id,
        otherProfileIds: others.map(R.prop('id')),
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
