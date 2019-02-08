// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import CurrencyProvider from 'components/CurrencyProvider'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import { injectStyles } from 'utils/styles'
import TopicCards from 'components/guidies/Cards'
import {
  currencyCodeSelector,
  hasNoResultsSelector,
  noResultsTextSelector,
  isLoadingSelector,
  listDisabledSelector,
} from './selectors'
import * as ACTIONS from './actions'
import DirectorySearch from './DirectorySearch'
import DirectoryHighlightTextProvider from './DirectoryHighlightTextProvider'
import DirectoryPager from './DirectoryPager'
import RecipientsTable from './RecipientsTable'
import styles from './Directory.jss'
import DirectoryFilter from './DirectoryFilter'

const Directory = ({
  classes,
  className,
  currencyCode,
  listDisabled,
  noResults,
  noResultsText,
  resetSearch,
}) => (
  <CurrencyProvider code={currencyCode}>
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Directory</BreadcrumbsItem>
        </Breadcrumbs>
        <DirectoryFilter />
      </FixedHeader>
      <div className={classes.container}>
        <TopicCards.Directory />
        <DirectorySearch
          placeholder="Start typing recipient or donor name…"
          className={classes.searchCard}
          loading={listDisabled}
        />
        <DirectoryHighlightTextProvider>
          <RecipientsTable className={classes.table} />
        </DirectoryHighlightTextProvider>
        {!noResults &&
          !listDisabled && (
            <div className={classes.tablePagerWrap}>
              <DirectoryPager className={classes.tablePager} />
            </div>
          )}
        {!listDisabled &&
          noResults && (
            <TableEmptyPlaceholder
              text={noResultsText}
              onReset={() => resetSearch()}
            />
          )}
      </div>
    </div>
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  currencyCode: currencyCodeSelector,
  listDisabled: listDisabledSelector,
  noResults: hasNoResultsSelector,
  noResultsText: noResultsTextSelector,
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
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles, { grid: true })
)(Directory)
