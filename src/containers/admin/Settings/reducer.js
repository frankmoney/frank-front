import Immutable, { fromJS } from 'immutable'
import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminSettings'

const defaultState = Immutable.fromJS({
  canNotDeleteNonEmptyCategorySnackShown: false,
  categories: [],
  isDemo: false,
  loaded: false,
  loading: true,
  openCategoryDialog: false,
  updating: false,
  editingCategoryType: null,
  editingCategoryId: null,
  editingCategory: null,
})

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true }),
    [ACTIONS.load.success]: (
      state,
      {
        payload: {
          categories,
          description,
          isDemo,
          isPublic,
          name,
          pid,
          sources,
        },
      }
    ) =>
      state.merge({
        categories: fromJS(categories),
        description,
        isDemo,
        isPublic,
        loaded: true,
        loading: false,
        name,
        pid,
        sources,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [ACTIONS.openCategoryDialog]: (state, { payload: { type, id } }) => {
      const foundCategory =
        id &&
        R.find(
          R.propEq('id', id),
          state
            .get('categories')
            .toJS()
            .filter(x => !x.removed)
        )

      return state.merge({
        openCategoryDialog: true,
        editingCategoryType: type,
        editingCategoryId: id,
        editingCategory: foundCategory ? fromJS(foundCategory) : null,
      })
    },
    [ACTIONS.closeCategoryDialog]: state =>
      state.merge({
        openCategoryDialog: false,
        editingCategoryType: null,
        editingCategoryId: null,
        editingCategory: null,
      }),
    [ACTIONS.submitAccountCard.success]: (
      state,
      {
        payload: {
          account: { name, description, isPublic },
        },
      }
    ) => state.merge({ name, description, isPublic }),
    [ACTIONS.createCategory.success]: (state, { payload: { category } }) =>
      state
        .set('openCategoryDialog', false)
        .update('categories', categories => categories.push(fromJS(category))),
    [ACTIONS.deleteCategory]: (state, { payload: { pid } }) =>
      state.update('categories', categories =>
        categories.update(
          categories.findIndex(x => x.get('id') === pid),
          category => category.set('removed', true)
        )
      ),
    [ACTIONS.deleteCategory.error]: (state, { payload: { pid, code } }) =>
      (code === 'hasPayments'
        ? state.set('canNotDeleteNonEmptyCategorySnackShown', true)
        : state
      ).update('categories', categories =>
        categories.update(
          categories.findIndex(x => x.get('id') === pid),
          category => category.set('removed', false)
        )
      ),
    [ACTIONS.updateCategory.success]: (state, { payload: { category } }) =>
      state
        .set('openCategoryDialog', false)
        .update('categories', categories =>
          categories.set(
            categories.findIndex(x => x.get('id') === category.id),
            fromJS(category)
          )
        ),
    [ACTIONS.canNotDeleteNonEmptyCategorySnackDismissed]: state =>
      state.set('canNotDeleteNonEmptyCategorySnackShown', false),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
