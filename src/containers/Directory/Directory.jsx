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
  Button,
  Spinner,
  PageLoader,
} from '@frankmoney/components'
import Breadcrumbs from 'components/Breadcrumbs'
import {
  hasNoResultsSelector,
  noResultsTextSelector,
  isLoadingSelector,
  isUpdatingSelector,
} from './selectors'
import * as ACTIONS from './actions'
import DirectorySearch from './DirectorySearch'
import DirectoryHighlightTextProvider from './DirectoryHighlightTextProvider'
import DirectoryPager from './DirectoryPager'
import RecipientsTable from './RecipientsTable'
import styles from './Directory.jss'
import DirectoryFilter from './DirectoryFilter/DirectoryFilter'

const Directory = ({
  classes,
  className,
  isUpdating,
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
      />
      {isUpdating && (
        <div className={classes.listLoaderWrap}>
          <Spinner className={classes.loader} />
        </div>
      )}
      {!isUpdating && (
        <DirectoryHighlightTextProvider>
          <RecipientsTable />
        </DirectoryHighlightTextProvider>
      )}
      {!noResults &&
        !isUpdating && (
          <div className={classes.tablePagerWrap}>
            <DirectoryPager className={classes.tablePager} />
          </div>
        )}
      {!isUpdating &&
        noResults && (
          <div className={classes.emptyPlaceholder}>
            <div className={classes.emptyPlaceholderLabel}>
              No {noResultsText} found
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
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  isUpdating: isUpdatingSelector,
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
