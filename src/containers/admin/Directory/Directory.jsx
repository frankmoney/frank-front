import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  BreadcrumbsItem,
  PageLoader,
} from '@frankmoney/components'
import Breadcrumbs from 'components/Breadcrumbs'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import {
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
  listDisabled,
  noResults,
  noResultsText,
  resetSearch,
}) => (
  <div className={cx(classes.root, className)}>
    <FixedHeader className={classes.header}>
      <Breadcrumbs>
        <BreadcrumbsItem>Directory</BreadcrumbsItem>
      </Breadcrumbs>
      <DirectoryFilter />
    </FixedHeader>
    <div className={classes.container}>
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
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
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
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Directory)
