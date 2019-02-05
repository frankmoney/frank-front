import { fromJS } from 'immutable'
import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'
import { SOURCE_STATUS } from './constants'

export const REDUCER_KEY = 'source-reconnect'

const defaultState = {
  loading: true,
  loaded: false,
  loadingNext: false,
  loadingBack: false,
  termsAccepted: false,
  stepData: {},
}

const omitNulls = R.pipe(
  R.toPairs,
  R.filter(kv => !R.isNil(kv[1])),
  R.fromPairs
)

const parseSourceState = ({ status, ...other }) => {
  const isChecking = status === SOURCE_STATUS.checking
  if (isChecking) {
    return {
      loading: isChecking,
      source: omitNulls(other),
    }
  }
  return {
    loading: isChecking,
    source: {
      status,
      ...omitNulls(other),
    },
  }
}

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        loading: true,
      }),
    [ACTIONS.load.success]: (state, { payload: source }) =>
      state.merge({
        source,
        loading: false,
        loaded: true,
      }),
    [ACTIONS.sendCredentials]: state =>
      state.merge({
        loading: true,
      }),
    [ACTIONS.sendMFA]: state =>
      state.merge({
        loading: true,
      }),
    [ACTIONS.updateSourceState]: (state, { payload: source }) =>
      state.mergeDeep(parseSourceState(source)),
    [ACTIONS.leave]: () => fromJS(defaultState),
  },
  fromJS(defaultState)
)
