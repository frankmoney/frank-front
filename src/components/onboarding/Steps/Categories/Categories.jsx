// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { Refresh as IconRefresh } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'
import Button from 'components/kit/Button'
import EditCategoryDialog from 'components/EditCategoryDialog'
import { OnboardingCategoryList } from 'components/admin/CategoryList'
import StepLayout from 'containers/admin/Onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'

const styles = {
  root: {},
  list: {
    marginTop: 50,
  },
}

const PAGE_TITLE_BY_TYPE = {
  spending: 'Spending categories',
  revenue: 'Income categories',
}

const LIST_TITLE_BY_TYPE = {
  spending: 'Spending',
  revenue: 'Income',
}

const Categories = ({
  className,
  classes,
  categoryType,
  categories,
  empty,
  editingCategory,
  openEditDialog,
  onCancelEdit,
  onAddCategory,
  onEditCategory,
  onSubmitEdit,
  onDeleteCategory,
  onDeleteAll,
  onRestoreCategories,
  categoryFormSubmissionSucceededAction,
  categoryFormSubmissionFailAction,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    backButtonProps={
      empty
        ? {
            label: 'Restore categories',
            icon: <IconRefresh />,
            onClick: () => onRestoreCategories(),
          }
        : {
            label:
              categoryType === 'spending'
                ? 'Back to account info'
                : 'Back to spending categories',
          }
    }
    footerButton={
      <Button
        color="blue"
        width={360}
        label="Add new category"
        onClick={onAddCategory}
      />
    }
  >
    <StepTitle>{PAGE_TITLE_BY_TYPE[categoryType]}</StepTitle>
    <StepDescription>
      To visualise your spending we require every payment to be categorized.
      <br />Please list all categories of your spending. You can edit it later
      <br />in the account settings.
    </StepDescription>
    {categories &&
      categories.length > 0 && (
        <OnboardingCategoryList
          title={LIST_TITLE_BY_TYPE[categoryType]}
          className={classes.list}
          categories={categories}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          onDeleteAll={onDeleteAll}
        />
      )}
    {openEditDialog && (
      <EditCategoryDialog
        defaultType={categoryType}
        category={editingCategory}
        open={openEditDialog}
        onCancel={onCancelEdit}
        onSubmitForm={onSubmitEdit}
        formSubmissionSucceededAction={categoryFormSubmissionSucceededAction}
        formSubmissionFailAction={categoryFormSubmissionFailAction}
      />
    )}
  </StepLayout>
)

export default compose(injectStyles(styles))(Categories)
