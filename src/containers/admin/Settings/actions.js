// @flow
import createActions from 'utils/createActions'

export default createActions('admin/settings', {
  load: true,
  update: true,
  openCategoryDialog: false,
  closeCategoryDialog: false,
  submitAccountCard: true,
  createCategory: true,
  deleteCategory: true,
  updateCategory: true,
  canNotDeleteNonEmptyCategorySnackDismissed: false,
  leave: false,
})
