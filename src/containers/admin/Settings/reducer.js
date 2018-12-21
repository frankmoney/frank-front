import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminSettings'

const defaultState = Immutable.fromJS({
  loading: true,
  loaded: false,
  updating: false,
  openCategoryDialog: false,
  spendingCategories: [],
  incomeCategories: [],
})

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true }),
    [ACTIONS.load.success]: (
      state,
      {
        payload: {
          pid,
          name,
          description,
          isPublic,
          sources,
          spendingCategories,
          incomeCategories,
        },
      }
    ) =>
      state.merge({
        loading: false,
        loaded: true,
        pid,
        name,
        description,
        isPublic,
        sources,
        spendingCategories: fromJS(spendingCategories),
        incomeCategories: fromJS(incomeCategories),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [ACTIONS.openCategoryDialog]: (state, { payload: { type, id } }) =>
      state.merge({
        openCategoryDialog: true,
        editingCategoryType: type,
        editingCategoryId: id,
      }),
    [ACTIONS.closeCategoryDialog]: state =>
      state.merge({
        openCategoryDialog: false,
      }),
    [ACTIONS.submitAccountCard.success]: (
      state,
      {
        payload: {
          account: { name, description, isPublic },
        },
      }
    ) => state.merge({ name, description, isPublic }),
    [ACTIONS.modifyCategoryList.success]: (
      state,
      { payload: { spendingCategories, incomeCategories } }
    ) =>
      state.merge({
        spendingCategories: fromJS(spendingCategories),
        incomeCategories: fromJS(incomeCategories),
      }),

    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
