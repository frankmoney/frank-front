// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import CurrencyProvider from 'components/CurrencyProvider'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ConnectedChartCard from './ConnectedChartCard'
import EmptyAccoutPlaceholder from './EmptyAccountPlaceholder'
import LedgerHighlightTextProvider from './LedgerHighlightTextProvider'
import LedgerPager from './LedgerPager'
import LedgerSearch from './LedgerSearch'
import LedgerTable from './LedgerTable'
import styles from './Ledger.jss'
import {
  currentCategoryNameSelector,
  hasNoResultsSelector,
  isEmptyAccountSelector,
  isLoadingSelector,
  listDisabledSelector,
  cascadeSnackbarShown,
  lastCascadeCountSelector,
  chartsVisibleSelector,
} from './selectors'
import LedgerFilter from './LedgerFilter'
import * as ACTIONS from './actions'
import PaymentCascadeSnackbar from './PaymentCascadeSnackbar'

const ConnectedPaymentCascadeSnackbar = reconnect(
  {
    count: lastCascadeCountSelector,
    shown: cascadeSnackbarShown,
  },
  {
    onDismiss: ACTIONS.dismissCascadeSnackbar,
  }
)(PaymentCascadeSnackbar)

const Ledger = ({
  cancelCategory,
  classes,
  className,
  currentCategory,
  isEmptyAccount,
  listDisabled,
  noResults,
  resetSearch,
  chartShown,
}) => (
  <CurrencyProvider code="USD">
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Ledger</BreadcrumbsItem>
          {currentCategory && (
            <BreadcrumbsItem onRemove={cancelCategory}>
              {currentCategory}
            </BreadcrumbsItem>
          )}
        </Breadcrumbs>
        <LedgerFilter />
      </FixedHeader>
      {isEmptyAccount && <EmptyAccoutPlaceholder />}
      {!isEmptyAccount && (
        <div className={classes.container}>
          <LedgerSearch
            placeholder="Start typing a category, recipient or part of a description..."
            className={classes.searchCard}
            loading={listDisabled}
          />
          {!listDisabled &&
            chartShown && (
              <ConnectedChartCard className={classes.overviewCard} />
            )}
          <LedgerHighlightTextProvider>
            <LedgerTable className={classes.table} />
          </LedgerHighlightTextProvider>
          {!noResults && (
            <div className={classes.tablePagerWrap}>
              <LedgerPager className={classes.tablePager} />
            </div>
          )}
          {!listDisabled &&
            noResults && (
              <TableEmptyPlaceholder
                text="payments"
                onReset={() => resetSearch()}
              />
            )}
        </div>
      )}
      <ConnectedPaymentCascadeSnackbar />
    </div>
  </CurrencyProvider>
)

export default compose(
  reconnect(
    {
      currentCategory: currentCategoryNameSelector,
      isEmptyAccount: isEmptyAccountSelector,
      listDisabled: listDisabledSelector,
      loading: isLoadingSelector,
      noResults: hasNoResultsSelector,
      chartShown: chartsVisibleSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      resetSearch: ACTIONS.resetSearch,
      cancelCategory: ACTIONS.cancelCategory,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load()
      }
    },
    componentWillReceiveProps(newProps) {
      if (newProps.accountId !== this.props.accountId) {
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Ledger)
