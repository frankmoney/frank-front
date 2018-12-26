// @flow
import React from 'react'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import EditCategoryDialog from 'components/EditCategoryDialog'
import SidebarSnack from 'components/SidebarSnack'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import styles from './Settings.jss'
import AccountCard from './AccountCard'
import BankCard from './BankCard'
import IncomeCategoriesCard from './IncomeCategoriesCard'
import SpendingCategoriesCard from './SpendingCategoriesCard'
import {
  loadingSelector,
  loadedSelector,
  openCategoryDialogSelector,
  editingCategorySelector,
  editingCategoryTypeSelector,
  canNotDeleteNonEmptyCategorySnackShownSelector,
} from './selectors'

const Settings = ({
  classes,
  className,
  editingCategory,
  editingCategoryType,
  openCategoryDialog,
  canNotDeleteNonEmptyCategorySnackShown,
  onCancelDialog,
  createCategory,
  updateCategory,
  handleCanNotDeleteNonEmptyCategorySnackDismiss,
}) => (
  <div className={cx(classes.root, className)}>
    <FixedHeader className={classes.header}>
      <Breadcrumbs>
        <BreadcrumbsItem>Settings</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <div className={classes.container}>
      <AccountCard className={classes.card} />
      <BankCard className={classes.card} />
      <SpendingCategoriesCard className={classes.card} />
      <IncomeCategoriesCard className={classes.card} />
      <EditCategoryDialog
        defaultType={editingCategoryType}
        category={editingCategory}
        open={openCategoryDialog}
        onCancel={onCancelDialog}
        formSubmissionFailedAction={
          editingCategory
            ? ACTIONS.updateCategory.error.toString()
            : ACTIONS.createCategory.error.toString()
        }
        formSubmissionSucceededAction={
          editingCategory
            ? ACTIONS.updateCategory.success.toString()
            : ACTIONS.createCategory.success.toString()
        }
        onSubmitForm={editingCategory ? updateCategory : createCategory}
      />
      <SidebarSnack
        color="red"
        shown={canNotDeleteNonEmptyCategorySnackShown}
        message="Only a category with no payments can be removed"
        dismissByTimeout={3000}
        onDismiss={handleCanNotDeleteNonEmptyCategorySnackDismiss}
      />
    </div>
  </div>
)

export default compose(
  reconnect(
    {
      loading: loadingSelector,
      loaded: loadedSelector,
      openCategoryDialog: openCategoryDialogSelector,
      editingCategory: editingCategorySelector,
      editingCategoryType: editingCategoryTypeSelector,
      canNotDeleteNonEmptyCategorySnackShown: canNotDeleteNonEmptyCategorySnackShownSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      onCancelDialog: ACTIONS.closeCategoryDialog,
      createCategory: ACTIONS.createCategory,
      updateCategory: ACTIONS.updateCategory,
      handleCanNotDeleteNonEmptyCategorySnackDismiss:
        ACTIONS.canNotDeleteNonEmptyCategorySnackDismissed,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles, { grid: true })
)(Settings)
