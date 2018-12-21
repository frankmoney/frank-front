// @flow
import createActions from 'utils/createActions'

export default createActions('admin/settings', {
  load: true,
  update: true,
  openCategoryDialog: false,
  closeCategoryDialog: false,
  modifyCategoryList: true,
  submitAccountCard: true,
  leave: false,
})
