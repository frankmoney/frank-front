// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import AreaSpinner from 'components/AreaSpinner'
import CurrencyProvider from 'components/CurrencyProvider'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ConnectedChartCard from './ConnectedChartCard'
import LedgerPager from './LedgerPager'
import LedgerTable from './LedgerTable'
import LedgerFilter from './LedgerFilter'
import LedgerHeader from './LedgerHeader'
import LedgerStats from './LedgerStats'
import LedgerTabs from './LedgerTabs'
import StoriesList from './StoriesList'
import styles from './Ledger.jss'
import {
  isLoadingSelector,
  listDisabledSelector,
  hasNoResultsSelector,
  currentCategoryNameSelector,
  currentTabSelector,
} from './selectors'
import * as ACTIONS from './actions'

type CurrentTab = 'ledger' | 'stories'

type Props = {|
  ...InjectStylesProps,
  //
  currentTab: CurrentTab,
|}

type State = {|
  offset: number,
|}

class Ledger extends React.Component<Props, State> {
  state = {
    offset: 0,
  }

  componentDidMount() {
    this.calculateOffset()
  }

  handleAnchorRef = node => {
    this.anchorRef = node
  }

  calculateOffset = () => {
    if (this.anchorRef) {
      this.setState({
        offset: this.anchorRef.getBoundingClientRect().top,
      })
    }
  }

  render() {
    const { classes, className, currentTab } = this.props

    return (
      <div className={cx(classes.root, className)}>
        <CurrencyProvider code="USD">
          <LedgerHeader offset={this.state.offset} />
          <div className={classes.container}>
            <LedgerStats />
            <div ref={this.handleAnchorRef}>
              <LedgerTabs className={classes.tabs} />
            </div>
            <LedgerFilter />
            {currentTab === 'ledger' && (
              <>
                <ConnectedChartCard className={classes.chartCard} />
                <LedgerTable className={classes.table} />
                <div className={classes.tablePagerWrap}>
                  <LedgerPager className={classes.tablePager} />
                </div>
              </>
            )}
            {currentTab === 'stories' && (
              <>
                <StoriesList className={classes.table} />
              </>
            )}
          </div>
        </CurrencyProvider>
      </div>
    )
  }
}

export default compose(
  reconnect(
    {
      loading: isLoadingSelector,
      listDisabled: listDisabledSelector,
      noResults: hasNoResultsSelector,
      currentCategory: currentCategoryNameSelector,
      currentTab: currentTabSelector,
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
        this.props.load({ accountId: this.props.accountId })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles, { grid: true })
)(Ledger)
