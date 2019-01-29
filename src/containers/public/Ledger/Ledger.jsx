// @flow strict-local
import React from 'react'
import cx from 'classnames'
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  lifecycle,
} from 'recompose'
import FiltersDrawer from 'containers/admin/Filters/FiltersDrawer'
import AreaSpinner from 'components/AreaSpinner'
import { type CurrencyCode } from 'contexts/CurrencyContext'
import CurrencyProvider from 'components/CurrencyProvider'
import NotFound from 'components/ErrorPage'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ConnectedChartCard from './ConnectedChartCard'
import LedgerPager from './LedgerPager'
import LedgerTable from './LedgerTable'
import LedgerHeader from './LedgerHeader'
import LedgerStats from './LedgerStats'
import LedgerTabs from './LedgerTabs'
import StoriesList from './StoriesList'
import styles from './Ledger.jss'
import {
  currentCategoryNameSelector,
  currentTabSelector,
  hasNoResultsSelector,
  isLoadingSelector,
  isNotFoundSelector,
  listDisabledSelector,
  loadedSelector,
  accountCurrencyCodeSelector,
  isLoadFailedSelector,
} from './selectors'
import * as ACTIONS from './actions'

type CurrentTab = 'ledger' | 'stories'

type Props = {|
  ...InjectStylesProps,
  //
  currencyCode: CurrencyCode,
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

  anchorRef: ?HTMLDivElement

  handleAnchorRef = (node: ?HTMLDivElement) => {
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
    const { classes, currencyCode, className, currentTab } = this.props

    return (
      <div className={cx(classes.root, className)}>
        <CurrencyProvider code={currencyCode}>
          <LedgerHeader offset={this.state.offset} />
          <div className={classes.container}>
            <LedgerStats />
            <div ref={this.handleAnchorRef}>
              <LedgerTabs className={classes.tabs} />
            </div>
            <FiltersDrawer disableVerifiedFilter disablePendingFilter />
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
              <StoriesList className={classes.table} />
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
      currentCategory: currentCategoryNameSelector,
      currentTab: currentTabSelector,
      isPrivateOrNotFound: isNotFoundSelector,
      currencyCode: accountCurrencyCodeSelector,
      listDisabled: listDisabledSelector,
      loaded: loadedSelector,
      loading: isLoadingSelector,
      isLoadFailed: isLoadFailedSelector,
      noResults: hasNoResultsSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      resetSearch: ACTIONS.resetSearch,
      cancelCategory: ACTIONS.cancelCategory,
    }
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.loaded) {
        this.props.load({ accountId: this.props.accountId })
      }
    },
    // TODO Public/Mobile ledger components both have common redux state
    // and when router switch between theese components `leave` store mutation not happen right before second component mount
    componentWillReceiveProps(nextProps) {
      if (!nextProps.loaded && this.props.loaded) {
        this.props.load({ accountId: this.props.accountId })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.isLoadFailed, renderNothing),
  branch(props => props.isPrivateOrNotFound, renderComponent(NotFound)),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Ledger)
