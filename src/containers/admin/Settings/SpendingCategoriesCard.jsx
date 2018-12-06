// @flow
import { compose, withProps, withHandlers } from 'recompose'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import CategoriesCard from './CategoriesCard'
import { spendingCategoriesSelector } from './selectors'

export default compose(
  withProps({ categoryType: 'spending' }),
  reconnect(
    { categories: spendingCategoriesSelector },
    {
      handleOpenDialog: ACTIONS.openCategoryDialog,
      handleModifyList: ACTIONS.modifyCategoryList,
    }
  ),
  withHandlers({
    onEdit: ({ categoryType, handleOpenDialog }) => categoryId =>
      handleOpenDialog({ type: categoryType, id: categoryId }),
    onDelete: ({ categoryType, handleModifyList }) => categoryId =>
      handleModifyList({ type: categoryType, id: categoryId }),
  })
)(CategoriesCard)
