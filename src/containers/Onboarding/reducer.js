import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'
import { STEPS } from './constants'

export const REDUCER_KEY = 'onboarding'

const defaultState = fromJS({
  currentStep: 'accountInfo',
  bank: {
    list: [],
    search: '',
    selectedBank: null,
  },
  credentials: {},
  account: {},
  accountInfo: {
    name: '',
    description: '',
  },
  categories: {
    list: [],
  },
  team: {
    list: [],
  },
})

export default handleActions(
  {
    [ACTIONS.goNext]: state =>
      state.update('currentStep', step => {
        const idx = STEPS.indexOf(step)
        if (idx === -1) {
          return STEPS[0]
          // reached end
        } else if (idx === STEPS.length - 1) {
          return step
        }
        return STEPS[idx + 1]
      }),
    [ACTIONS.goBack]: state =>
      state.update('currentStep', step => {
        const idx = STEPS.indexOf(step)
        if (idx === -1) {
          return STEPS[0]
          // we are at the start
        } else if (idx === 0) {
          return step
        }
        return STEPS[idx - 1]
      }),
    [ACTIONS.bankSelect]: (state, { payload: bank }) =>
      state.setIn(['bank', 'selectedBank'], fromJS(bank)),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
