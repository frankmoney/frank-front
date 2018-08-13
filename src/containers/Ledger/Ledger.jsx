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
} from '@frankmoney/components'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import CurrencyProvider from 'components/CurrencyProvider'
import LedgerSearch from './LedgerSearch'
import GraphOverviewCard from './GraphOverviewCard'
import styles from './Ledger.jss'
import LedgerTable from './LedgerTable'
import { isLoadingSelector, searchTextSelector } from './selectors'
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

const Ledger = ({ classes, className }) => (
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
        <ConnectedGraphOverviewCard className={classes.overviewCard} />
        <LedgerTable />
      </div>
    </div>
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
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
