import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { Button } from '@frankmoney/components'
import cx from 'classnames'
import reconnect from 'utils/reconnect'
import EditCategoryDialog from 'components/EditCategoryDialog'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import {
  categoriesSelector,
  editingCategorySelector,
  openEditCategoryDialogSelector,
} from '../../selectors'
import * as ACTIONS from '../../actions'
import CategoriesList from './CategoriesList'

const styles = {
  root: {},
  addCategoryButton: {
    width: 360,
  },
  list: {
    marginTop: 50,
  },
}

const Categories = ({
  className,
  classes,
  categories,
  editingCategory,
  openEditDialog,
  onCancelEdit,
  onAddCategory,
  onEditCategory,
  onSubmitEdit,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerButton={
      <Button
        className={classes.addCategoryButton}
        label="Add new category"
        onClick={onAddCategory}
      />
    }
  >
    <StepTitle>List your categories</StepTitle>
    <StepDescription>
      To visualise your spending we require every payment to be categorized.
      <br />Please list all categories of your spending. You can edit it later
      <br />in the account settings.
    </StepDescription>
    {categories &&
      categories.length && (
        <CategoriesList
          className={classes.list}
          categories={categories}
          onEdit={onEditCategory}
        />
      )}
    <EditCategoryDialog
      category={editingCategory}
      open={openEditDialog}
      onCancel={onCancelEdit}
      onSubmit={onSubmitEdit}
    />
  </StepLayout>
)

export default compose(
  reconnect(
    {
      categories: categoriesSelector,
      openEditDialog: openEditCategoryDialogSelector,
      editingCategory: editingCategorySelector,
    },
    {
      onAddCategory: ACTIONS.addNewCategory,
      onEditCategory: ACTIONS.editCategory,
      onCancelEdit: ACTIONS.cancelEditCategory,
      onSubmitEdit: ACTIONS.submitEditCategory,
    }
  ),
  injectStyles(styles)
)(Categories)
