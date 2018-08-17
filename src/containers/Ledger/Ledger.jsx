import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import {
  compose,
  branch,
  renderNothing,
  renderComponent,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
  PageLoader,
  Spinner,
} from '@frankmoney/components'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import HighlightTextProvider from 'components/HighlightText/HighlightTextProvider'
import Pager from 'components/Pager'
import CurrencyProvider from 'components/CurrencyProvider'
import LedgerSearch from './LedgerSearch'
import GraphOverviewCard from './GraphOverviewCard'
import styles from './Ledger.jss'
import LedgerTable from './LedgerTable'
import {
  isLoadingSelector,
  listIsUpdatingSelector,
  searchTextSelector,
} from './selectors'
import LedgerFilter from './LedgerFilter'
import * as ACTIONS from './actions'
import {
  categoricalDataSelector,
  dualDataSelector,
} from './GraphOverviewCard/selectors'

const ConnectedGraphOverviewCard = compose(
  connect(state => ({
    categoricalData: categoricalDataSelector(state),
    dualData: dualDataSelector(state),
    search: searchTextSelector(state),
  })),
  branch(props => props.search, renderNothing)
)(GraphOverviewCard)

const SearchWrap = ({ value, children }) => (
  <HighlightTextProvider value={value}>{children}</HighlightTextProvider>
)
const SearchHighlightTextProvider = connect(
  state => ({
    value: searchTextSelector(state),
  }),
  null
)(SearchWrap)

const Ledger = ({ classes, loadingListOnly, className }) => (
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
        {loadingListOnly && (
          <div className={classes.listLoaderWrap}>
            <Spinner className={classes.loader} />
          </div>
        )}
        {!loadingListOnly && (
          <ConnectedGraphOverviewCard className={classes.overviewCard} />
        )}
        {!loadingListOnly && (
          <SearchHighlightTextProvider>
            <LedgerTable />
          </SearchHighlightTextProvider>
        )}
        {!loadingListOnly && (
          <div className={classes.tablePagerWrap}>
            <Pager
              className={classes.tablePager}
              current={5}
              total={16}
              onPageSelect={R.noop}
            />
          </div>
        )}
      </div>
    </div>
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  loadingListOnly: listIsUpdatingSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
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
