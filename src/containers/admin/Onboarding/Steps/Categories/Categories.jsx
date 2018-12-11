// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import Button from 'components/kit/Button'
import EditCategoryDialog from 'components/EditCategoryDialog'
import { OnboardingCategoryList } from 'components/admin/CategoryList'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import {
  categoriesSelector,
  editingCategorySelector,
  openEditCategoryDialogSelector,
} from '../../selectors'
import * as ACTIONS from '../../actions'

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
  onDeleteCategory,
  onDeleteAll,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    backButtonText="Back to account info"
    footerButton={
      <Button
        color="blue"
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
      categories.length > 0 && (
        <OnboardingCategoryList
          className={classes.list}
          categories={categories}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          onDeleteAll={onDeleteAll}
        />
      )}
    <EditCategoryDialog
      category={editingCategory}
      open={openEditDialog}
      onCancel={onCancelEdit}
      onSubmitForm={onSubmitEdit}
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
      onDeleteCategory: ACTIONS.removeCategory,
      onCancelEdit: ACTIONS.cancelEditCategory,
      onSubmitEdit: ACTIONS.submitEditCategory,
      onDeleteAll: ACTIONS.cleanAllCategories,
    }
  ),
  injectStyles(styles)
)(Categories)
