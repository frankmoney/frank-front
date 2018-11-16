// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import CurrencyProvider from 'components/CurrencyProvider'
import Breadcrumbs from 'components/Breadcrumbs'
import PageLoader from 'components/PageLoader'
import { injectStyles } from 'utils/styles'
import ConnectedChartCard from './ConnectedChartCard'
import LedgerHighlightTextProvider from './LedgerHighlightTextProvider'
import LedgerPager from './LedgerPager'
import LedgerSearch from './LedgerSearch'
import LedgerTable from './LedgerTable'
import styles from './Ledger.jss'
import {
  isLoadingSelector,
  listDisabledSelector,
  hasNoResultsSelector,
  currentCategoryNameSelector,
} from './selectors'
import LedgerFilter from './LedgerFilter'
import * as ACTIONS from './actions'

const Ledger = ({
  classes,
  listDisabled,
  currentCategory,
  noResults,
  resetSearch,
  cancelCategory,
  className,
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
      <div className={classes.container}>
        <LedgerSearch
          placeholder="Start typing a category, recipient or part of a description..."
          className={classes.searchCard}
          loading={listDisabled}
        />
        {!listDisabled && (
          <ConnectedChartCard className={classes.overviewCard} />
        )}
        <LedgerHighlightTextProvider>
          <LedgerTable className={classes.table} />
        </LedgerHighlightTextProvider>
        {!noResults &&
          !listDisabled && (
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
    </div>
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  listDisabled: listDisabledSelector,
  noResults: hasNoResultsSelector,
  currentCategory: currentCategoryNameSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    resetSearch: ACTIONS.resetSearch,
    cancelCategory: ACTIONS.cancelCategory,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
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
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Ledger)