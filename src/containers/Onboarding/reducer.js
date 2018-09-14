import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'
import { STEPS } from './constants'

export const REDUCER_KEY = 'onboarding'
const CATEGORIES = [
  {
    category: {
      id: 'cjkxpe30m0bky0b08ptqbpyxu',
      name: 'Certification',
      color: '#fde282',
    },
    income: 0,
    expenses: 59486.77,
  },
  {
    category: {
      id: 'cjkxpe4a60bl90b089gsjjbro',
      name: 'Taxes',
      color: '#ffb54c',
    },
    income: 5000,
    expenses: 89868.78,
  },
  {
    category: {
      id: 'cjkxpe5dm0blk0b08msdrtu9s',
      name: 'Product development',
      color: '#3cd5c1',
    },
    income: 0,
    expenses: 47960.19,
  },
  {
    category: {
      id: 'cjkxpe8u50bmh0b08laoi9oow',
      name: 'Product design',
      color: '#0aaddb',
    },
    income: 0,
    expenses: 63555.35999999999,
  },
  {
    category: {
      id: 'cjkxpeaqv0bmy0b080odzrphz',
      name: 'Fundraising events',
      color: '#00bd6a',
    },
    income: 0,
    expenses: 52847.59,
  },
  {
    category: {
      id: 'cjkxpeix20bou0b0826080qls',
      name: 'Operating expenses',
      color: '#b259ad',
    },
    income: 0,
    expenses: 57506.97,
  },
  {
    category: {
      id: 'cjkxpek4r0bp50b08maikpsef',
      name: 'Administrative expenses',
      color: '#0a70dd',
    },
    income: 29000,
    expenses: 50120.79,
  },
]
  .map(x => x.category)
  .filter(x => !!x)

const TEAM = [
  {
    email: 'gabriel@liberman.ru',
    role: 'Administrator',
  },
  {
    email: 'a.ivanov@ivanov.ru',
    role: 'Manager',
  },
  {
    email: 'greenkaktus@gmail.com',
    role: 'Observer',
  },
]

const defaultState = {
  loading: true,
  loaded: false,
  loadingNext: false,
  loadingBack: false,
  currentStep: 'team',
  stepData: {},
  credentials: {},
  account: {},
  accountInfo: {
    name: '',
    description: '',
  },
  categories: {
    list: CATEGORIES,
  },
  team: {
    list: TEAM,
  },
}

const getStepData = session => {
  if (!session) {
    return {
      currentStep: 'bank',
      stepData: {
        bankList: [],
        search: '',
        selectedBank: null,
        loading: true,
        loaded: false,
      },
    }
  }

  const { institution: bank, credentials } = session

  if (credentials.status === 'awaiting_input') {
    return {
      currentStep: 'credentials',
      session,
      stepData: {
        selectedBank: bank,
        ...credentials,
      },
    }
  }
}

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        loading: true,
      }),
    [ACTIONS.load.success]: (state, { payload: session }) =>
      state.merge({
        ...getStepData(session),
        loading: false,
        loaded: true,
      }),
    [ACTIONS.goNext]: state =>
      state.merge({
        loadingNext: true,
      }),
    [ACTIONS.goNext.success]: (state, { payload: session }) =>
      state.merge({
        loadingNext: false,
        ...getStepData(session),
      }),
    [ACTIONS.goBack]: state =>
      state.merge({
        loadingBack: true,
      }),
    [ACTIONS.goBack.success]: (state, { payload: session }) =>
      state.merge({
        loadingBack: false,
        ...getStepData(session),
      }),
    // [ACTIONS.goNext]: state =>
    //   state.update('currentStep', step => {
    //     const idx = STEPS.indexOf(step)
    //     if (idx === -1) {
    //       return STEPS[0]
    //       // reached end
    //     } else if (idx === STEPS.length - 1) {
    //       return step
    //     }
    //     return STEPS[idx + 1]
    //   }),
    // [ACTIONS.goBack]: state =>
    //   state.update('currentStep', step => {
    //     const idx = STEPS.indexOf(step)
    //     if (idx === -1) {
    //       return STEPS[0]
    //       // we are at the start
    //     } else if (idx === 0) {
    //       return step
    //     }
    //     return STEPS[idx - 1]
    //   }),

    //
    // BANK
    //

    [ACTIONS.loadBanks]: state =>
      state.mergeIn(['stepData'], {
        loading: true,
      }),
    [ACTIONS.loadBanks.success]: (state, { payload }) =>
      state.mergeIn(['stepData'], {
        loading: false,
        loaded: true,
        bankList: fromJS(payload),
      }),
    [ACTIONS.bankNameType]: (state, { payload: search }) =>
      state.mergeIn(['stepData'], { search, selectedBank: null }),
    [ACTIONS.bankSelect]: (state, { payload: bankId }) =>
      state.setIn(
        ['stepData', 'selectedBank'],
        fromJS(
          state
            .getIn(['stepData', 'bankList'])
            .filter(x => x.get('code') === bankId)
            .get(0)
        )
      ),

    [ACTIONS.leave]: () => fromJS(defaultState),
  },
  fromJS(defaultState)
)
