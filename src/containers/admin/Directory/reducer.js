import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminDirectory'

const defaultState = Immutable.fromJS({
  typing: false,
  loading: true,
  updating: false,
  loaded: false,
  currencyCode: null,
  recipientsCount: 0,
  recipients: [],
})

export default handleActions(
  {
    [ACTIONS.searchTyping]: state => state.merge({ typing: true }),
    [ACTIONS.load]: (state, { payload: { update } }) =>
      state.merge(update ? { updating: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      { payload: { currencyCode, recipients, totalCount } }
    ) =>
      state.merge({
        loading: false,
        typing: false,
        updating: false,
        loaded: true,
        currencyCode,
        recipientsCount: totalCount,
        recipients: fromJS(recipients),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
