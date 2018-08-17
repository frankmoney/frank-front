import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
  PageLoader,
  Spinner,
  Button,
} from '@frankmoney/components'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import CurrencyProvider from 'components/CurrencyProvider'
import LedgerHighlightTextProvider from './LedgerHighlightTextProvider'
import LedgerPager from './LedgerPager'
import LedgerSearch from './LedgerSearch'
import LedgerOverviewCard from './LedgerOverviewCard'
import styles from './Ledger.jss'
import LedgerTable from './LedgerTable'
import {
  isLoadingSelector,
  listIsUpdatingSelector,
  hasNoResultsSelector,
} from './selectors'
import LedgerFilter from './LedgerFilter'
import * as ACTIONS from './actions'

const Ledger = ({
  classes,
  listIsUpdating,
  noResults,
  resetSearch,
  className,
}) => (
  <CurrencyProvider code="USD">
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Ledger</BreadcrumbsItem>
        </Breadcrumbs>
        <LedgerFilter />
      </FixedHeader>
      <div className={classes.container}>
        <LedgerSearch
          placeholder="Start typing a category, recipient or part of a description..."
          className={classes.searchCard}
        />
        {listIsUpdating && (
          <div className={classes.listLoaderWrap}>
            <Spinner className={classes.loader} />
          </div>
        )}
        {!listIsUpdating && (
          <LedgerOverviewCard className={classes.overviewCard} />
        )}
        {!listIsUpdating && (
          <LedgerHighlightTextProvider>
            <LedgerTable />
          </LedgerHighlightTextProvider>
        )}
        {!noResults &&
          !listIsUpdating && (
            <div className={classes.tablePagerWrap}>
              <LedgerPager className={classes.tablePager} />
            </div>
          )}
        {!listIsUpdating &&
          noResults && (
            <div className={classes.emptyPlaceholder}>
              <div className={classes.emptyPlaceholderLabel}>
                No payments found
              </div>
              <Button
                className={classes.footerButton}
                fat
                type="secondary"
                label="Reset"
                onClick={() => resetSearch()}
              />
            </div>
          )}
      </div>
    </div>
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  listIsUpdating: listIsUpdatingSelector,
  noResults: hasNoResultsSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    resetSearch: ACTIONS.resetSearch,
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
