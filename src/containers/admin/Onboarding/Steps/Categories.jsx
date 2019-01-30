// @flow
import { compose } from 'recompose'
import Categories from 'components/onboarding/Steps/Categories'
import reconnect from 'utils/reconnect'
import {
  categoriesSelector,
  editingCategorySelector,
  openEditCategoryDialogSelector,
  categoryTypeSelector,
  emptyCategoriesSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

const noargs = fn => () => fn()

export default compose(
  reconnect(
    {
      categories: categoriesSelector,
      openEditDialog: openEditCategoryDialogSelector,
      editingCategory: editingCategorySelector,
      categoryType: categoryTypeSelector,
      empty: emptyCategoriesSelector,
    },
    {
      onAddCategory: noargs(ACTIONS.addNewCategory),
      onEditCategory: ACTIONS.editCategory,
      onDeleteCategory: ACTIONS.removeCategory,
      onCancelEdit: noargs(ACTIONS.cancelEditCategory),
      onSubmitEdit: ACTIONS.submitEditCategory,
      onDeleteAll: noargs(ACTIONS.cleanAllCategories),
      onRestoreCategories: noargs(ACTIONS.restoreCategories),
    }
  )
)(Categories)
