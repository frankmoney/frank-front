// @flow
import React from 'react'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import EditCategoryDialog from 'components/EditCategoryDialog'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import styles from './Settings.jss'
import AccountCard from './AccountCard'
import BankCard from './BankCard'
import IncomeCategoriesCard from './IncomeCategoriesCard'
import SpendingCategoriesCard from './SpendingCategoriesCard'
import {
  openCategoryDialogSelector,
  editingCategorySelector,
} from './selectors'

const Settings = ({
  classes,
  className,
  editingCategory,
  openCategoryDialog,
  onCancelDialog,
  onModifyCategoryList,
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
        category={editingCategory}
        open={openCategoryDialog}
        onCancel={onCancelDialog}
        onSubmitForm={onModifyCategoryList}
      />
    </div>
  </div>
)

export default compose(
  reconnect(
    {
      openCategoryDialog: openCategoryDialogSelector,
      editingCategory: editingCategorySelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      onCancelDialog: ACTIONS.closeCategoryDialog,
      onModifyCategoryList: ACTIONS.modifyCategoryList,
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
