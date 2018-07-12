import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import CurrencyProvider from 'components/CurrencyProvider'
import SearchCard from './SearchCard'
import GraphOverviewCard from './GraphOverviewCard'
import styles from './Ledger.jss'
import LedgerTable from './LedgerTable'

class Ledger extends React.PureComponent {
  state = {
    searchValue: '',
  }

  handleChangeSearch = event => {
    this.setState({ searchValue: event.currentTarget.value })
  }

  render() {
    const { classes, className } = this.props

    const { searchValue } = this.state

    return (
      <CurrencyProvider code="USD">
        <div className={cx(classes.ledgerPage, className)}>
          <FixedHeader>
            <Breadcrumbs>
              <BreadcrumbsItem>Ledger</BreadcrumbsItem>
            </Breadcrumbs>
          </FixedHeader>
          <div className={classes.contrainer}>
            <SearchCard
              className={classes.searchCard}
              value={searchValue}
              onChange={this.handleChangeSearch}
            />
            {searchValue === '' && (
              <GraphOverviewCard className={classes.overviewCard} />
            )}

            <LedgerTable />
          </div>
        </div>
      </CurrencyProvider>
    )
  }
}

export default compose(injectStyles(styles, { fixedGrid: true }))(Ledger)
