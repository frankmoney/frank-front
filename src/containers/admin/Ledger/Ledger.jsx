// @flow strict-local
import qs from 'querystring'
import React from 'react'
import cx from 'classnames'
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  renderNothing,
  withProps,
} from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import TopicCards from 'components/guidies/Cards'
import CurrencyProvider from 'components/CurrencyProvider'
import NotFound from 'components/ErrorPage'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import EmptyAccountPlaceholder from 'components/admin/EmptyAccountPlaceholder'
import MultiEditSnack from 'containers/admin/MultiEditSnack'
import ConnectedChartCard from './ConnectedChartCard'
import LedgerHighlightTextProvider from './LedgerHighlightTextProvider'
import LedgerPager from './LedgerPager'
import LedgerSearch from './LedgerSearch'
import LedgerTable from './LedgerTable'
import styles from './Ledger.jss'
import {
  cascadeSnackbarShown,
  categoriesSelector,
  chartsVisibleSelector,
  currentCategoryNameSelector,
  hasNoResultsSelector,
  isEmptyAccountSelector,
  isLoadFailedSelector,
  isLoadingSelector,
  isNotFoundSelector,
  lastCascadeCountSelector,
  listDisabledSelector,
  loadedSelector,
} from './selectors'
import LedgerFilter from './LedgerFilter'
import * as ACTIONS from './actions'
import PaymentCascadeSnackbar from './PaymentCascadeSnackbar'

const ConnectedPaymentCascadeSnackbar = reconnect(
  {
    count: lastCascadeCountSelector,
    shown: cascadeSnackbarShown,
  },
  {
    onDismiss: ACTIONS.dismissCascadeSnackbar,
  }
)(PaymentCascadeSnackbar)

const ConnectedMultiEditSnack = reconnect({
  categories: categoriesSelector,
})(MultiEditSnack)

const Ledger = ({
  cancelCategory,
  chartShown,
  classes,
  className,
  currentCategory,
  isEmptyAccount,
  listDisabled,
  noResults,
  resetSearch,
}) => (
  <CurrencyProvider code="USD">
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Ledger</BreadcrumbsItem>
          {currentCategory && (
            <BreadcrumbsItem onRemove={cancelCategory}>
              {currentCategory}
            </BreadcrumbsItem>
          )}
        </Breadcrumbs>
        {!isEmptyAccount && <LedgerFilter />}
      </FixedHeader>
      {isEmptyAccount && <EmptyAccountPlaceholder text="No payments yet" />}
      {!isEmptyAccount && (
        <div className={classes.container}>
          <TopicCards.Ledger />
          <LedgerSearch
            placeholder="Start typing a category, recipient or part of a description..."
            className={classes.searchCard}
            loading={listDisabled}
          />
          {!listDisabled &&
            chartShown && (
              <ConnectedChartCard className={classes.overviewCard} />
            )}
          <LedgerHighlightTextProvider>
            <LedgerTable className={classes.table} />
          </LedgerHighlightTextProvider>
          {!noResults && (
            <div className={classes.tablePagerWrap}>
              <LedgerPager className={classes.tablePager} />
            </div>
          )}
          {!listDisabled &&
            noResults && (
              <TableEmptyPlaceholder
                text="payments"
                onReset={() => resetSearch()}
              />
            )}
        </div>
      )}
      <ConnectedPaymentCascadeSnackbar />
      <ConnectedMultiEditSnack />
    </div>
  </CurrencyProvider>
)

export default compose(
  reconnect(
    {
      chartShown: chartsVisibleSelector,
      currentCategory: currentCategoryNameSelector,
      isEmptyAccount: isEmptyAccountSelector,
      isLoadFailed: isLoadFailedSelector,
      isPrivateOrNotFound: isNotFoundSelector,
      listDisabled: listDisabledSelector,
      loading: isLoadingSelector,
      loaded: loadedSelector,
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
    componentWillMount() {
      if (!this.props.loaded) {
        const query =
          this.props.location &&
          typeof this.props.location.search === 'string' &&
          qs.parse(this.props.location.search.substr(1))

        this.props.load({
          sourcePids: query && query.src && query.src.split(','),
        })
      }
    },
    componentWillReceiveProps(newProps) {
      if (newProps.accountId !== this.props.accountId) {
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.isLoadFailed, renderNothing),
  branch(
    props => props.isPrivateOrNotFound,
    renderComponent(withProps({ hideLogo: true })(NotFound))
  ),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Ledger)
