import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { DEFAULT_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from 'const'
import * as ACTIONS from './actions'
import { CREDENTIALS_STATUS } from './constants'

export const REDUCER_KEY = 'onboarding'

const getDefaultCategories = categoryType =>
  (categoryType === 'spending'
    ? DEFAULT_CATEGORIES
    : DEFAULT_INCOME_CATEGORIES
  ).map(category => ({
    ...category,
    id: Math.random().toString(),
  }))

const defaultState = {
  loading: true,
  loaded: false,
  loadingNext: false,
  loadingBack: false,
  currentStep: null,
  termsAccepted: false,
  stepData: {},
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

  const {
    step,
    institution: bank,
    mfa,
    credentials,
    accounts,
    account,
    categories,
  } = session

  if (step === 'credentials') {
    return {
      currentStep: 'credentials',
      session,
      stepData: {
        selectedBank: bank,
        ...credentials,
      },
    }
  } else if (step === 'mfa') {
    return {
      currentStep: 'mfa',
      session,
      stepData: {
        selectedBank: bank,
        status: mfa.status,
        fields: mfa.challenges,
      },
    }
  } else if (step === 'accounts') {
    return {
      currentStep: 'account',
      session,
      stepData: {
        selectedBank: bank,
        accounts,
      },
    }
  } else if (step === 'account') {
    return {
      currentStep: 'accountInfo',
      session,
      stepData: {
        accountName: account.frankName || account.name,
        accountDescription: account.frankDescription,
      },
    }
  } else if (step === 'spendingCategories' || step === 'revenueCategories') {
    const categoryType = step === 'spendingCategories' ? 'spending' : 'revenue'

    return {
      currentStep: 'categories',
      session,
      stepData: {
        list: categories || getDefaultCategories(categoryType),
        categoryType,
      },
    }
  } else if (step === 'team') {
    return {
      currentStep: 'team',
      session,
      stepData: {
        invites: session.invites || [],
        team: session.team,
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
    [ACTIONS.load.success]: (state, { payload: { session, termsAccepted } }) =>
      state.merge({
        ...getStepData(session, state),
        loading: false,
        loaded: true,
        termsAccepted,
      }),
    [ACTIONS.goNext]: state =>
      state.merge({
        loadingNext: true,
      }),
    [ACTIONS.goNext.success]: (state, { payload: session }) =>
      state.merge({
        loadingNext: false,
        ...getStepData(session, state),
      }),
    [ACTIONS.goBack]: state =>
      state.merge({
        loadingBack: true,
      }),
    [ACTIONS.goBack.success]: (state, { payload: session }) =>
      state.merge({
        loadingBack: false,
        ...getStepData(session, state),
      }),
    [ACTIONS.cancel]: state =>
      state.merge({
        loading: true,
        loadingBack: false,
        loadingNext: false,
      }),
    [ACTIONS.acceptTerms]: state =>
      state.merge({
        termsAccepted: true,
      }),
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

    // Credentials
    [ACTIONS.backToCredentials]: state =>
      state.mergeIn(['stepData'], { status: CREDENTIALS_STATUS.initial }),
    //
    // Select Account
    //
    [ACTIONS.accountSelect]: (state, { payload: accountId }) =>
      state.mergeIn(['stepData'], {
        selectedAccountId: accountId,
      }),
    //
    // Categories
    //
    [ACTIONS.addNewCategory]: state =>
      state.mergeIn(['stepData'], {
        openEditDialog: true,
        editingCategoryId: null,
      }),
    [ACTIONS.editCategory]: (state, { payload: categoryId }) =>
      state.mergeIn(['stepData'], {
        openEditDialog: true,
        editingCategoryId: categoryId,
      }),
    [ACTIONS.cancelEditCategory]: state =>
      state.mergeIn(['stepData'], {
        openEditDialog: false,
      }),
    [ACTIONS.submitEditCategory]: (state, { payload }) =>
      state
        .mergeIn(['stepData'], {
          openEditDialog: false,
        })
        .updateIn(
          ['stepData', 'list'],
          list =>
            payload.id
              ? list.mergeIn(
                  [list.findIndex(x => x.get('id') === payload.id)],
                  payload
                )
              : list.push(fromJS({ ...payload, id: Math.random().toString() }))
        ),
    [ACTIONS.removeCategory]: (state, { payload: id }) =>
      state.updateIn(['stepData', 'list'], list =>
        list.deleteIn([list.findIndex(x => x.get('id') === id)])
      ),
    [ACTIONS.cleanAllCategories]: state =>
      state.mergeIn(['stepData'], {
        list: [],
      }),
    [ACTIONS.restoreCategories]: state =>
      state.mergeIn(['stepData'], {
        list: getDefaultCategories(state.getIn(['stepData', 'categoryType'])),
      }),

    // Team
    [ACTIONS.openInvite]: state =>
      state.mergeIn(['stepData'], {
        inviteDrawerOpen: true,
      }),
    [ACTIONS.closeInvite]: state =>
      state.mergeIn(['stepData'], {
        inviteDrawerOpen: false,
      }),
    [ACTIONS.submitInvite]: (state, { payload: invite }) =>
      state
        .updateIn(['stepData', 'invites'], list => list.push(fromJS(invite)))
        .mergeIn(['stepData'], {
          inviteDrawerOpen: false,
        }),
    [ACTIONS.leave]: () => fromJS(defaultState),
  },
  fromJS(defaultState)
)
