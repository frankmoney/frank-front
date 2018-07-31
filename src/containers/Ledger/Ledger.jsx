import React from 'react'
import cx from 'classnames'
import { compose, branch, renderNothing } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import CurrencyProvider from 'components/CurrencyProvider'
import SearchCard from 'components/SearchCard'
import { searchTyping } from './actions'
import GraphOverviewCard from './GraphOverviewCard'
import styles from './Ledger.jss'
import LedgerTable from './LedgerTable'
import { searchTextSelector } from './selectors'
import {
  categoricalDataSelector,
  dualDataSelector,
} from './GraphOverviewCard/selectors'

const ConnectedSearchCard = connect(
  state => ({
    value: searchTextSelector(state),
  }),
  dispatch => ({
    onChange: event => {
      dispatch(searchTyping(event.currentTarget.value))
    },
  })
)(SearchCard)

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
    <div className={cx(classes.ledgerPage, className)}>
      <FixedHeader>
        <Breadcrumbs>
          <BreadcrumbsItem>Ledger</BreadcrumbsItem>
        </Breadcrumbs>
      </FixedHeader>
      <div className={classes.container}>
        <ConnectedSearchCard
          placeholder="Start typing a category, recipient or part of a description..."
          className={classes.searchCard}
        />
        <ConnectedGraphOverviewCard className={classes.overviewCard} />
        <LedgerTable />
      </div>
    </div>
  </CurrencyProvider>
)

export default compose(injectStyles(styles, { fixedGrid: true }))(Ledger)
