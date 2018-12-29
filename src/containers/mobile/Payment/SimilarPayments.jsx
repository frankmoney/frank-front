// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import AreaSpinner from 'components/AreaSpinner'
import Button, { IconPlainButton } from 'components/kit/Button'
import CurrencyProvider from 'components/CurrencyProvider'
import CloseIcon from 'components/kit/Drawer/CloseIcon.svg'
import { type Account, type AccountId } from 'data/models/account'
import { type Payment, type PaymentId } from 'data/models/payment'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import {
  drawerOpenedSelector,
  listLoadingSelector,
  listMoreLoadingSelector,
  similarPaymentsSelector,
  similarCountSelector,
  loadedPagesCounterSelector,
  totalPagesCounterSelector,
} from 'containers/public/Payment/selectors'
import ACTIONS from 'containers/public/Payment/actions'
import { createPaymentClickHandler, type WithHistoryProps } from '../utils'
import SimilarPayment from './SimilarPayment'

const styles = theme => ({
  root: {},
  header: {
    display: 'flex',
    ...theme.fontMedium(26, 34),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [0, 20],
    height: 65,
  },
})

type PaymentLoadAction = ({|
  accountId: AccountId,
  paymentId: PaymentId,
|}) => void

type Props = {|
  ...InjectStylesProps,
  ...WithHistoryProps,
  //
  account: Account,
  loadedPagesCounter: number,
  loadPayment: PaymentLoadAction,
  onClose: () => void,
  onLoadMore: () => void,
  payments: Array<Payment>,
  paymentsCount: number,
  totalPagesCounter: number,
|}

const SimilarPayments = ({
  account,
  classes,
  loadedPagesCounter,
  loadPayment,
  onClose,
  onLoadMore,
  payments,
  paymentsCount,
  totalPagesCounter,
  //
  history,
}: Props) => {
  const { id: accountId, currencyCode } = account
  const updateHistory = createPaymentClickHandler(accountId, history)
  const onPaymentClick = paymentId => {
    onClose()
    if (updateHistory) {
      updateHistory(paymentId)
    }
    loadPayment({ accountId, paymentId })
  }
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>{`${paymentsCount} similar payments`}</span>
        <IconPlainButton icon={<CloseIcon />} onClick={onClose} />
      </div>
      <CurrencyProvider code={currencyCode}>
        {R.map(
          ({ id, ...props }) => (
            <SimilarPayment
              onPaymentClick={() => onPaymentClick(id)}
              key={id}
              {...props}
            />
          ),
          payments
        )}
      </CurrencyProvider>
      {totalPagesCounter > loadedPagesCounter && (
        <Button
          className={classes.similarButton}
          label={`Show more payments`} // TODO: counter?
          onClick={onLoadMore}
        />
      )}
    </div>
  )
}

export default compose(
  reconnect(
    {
      loadedPagesCounter: loadedPagesCounterSelector,
      loading: listLoadingSelector,
      loadingMore: listMoreLoadingSelector,
      open: drawerOpenedSelector,
      payments: similarPaymentsSelector,
      paymentsCount: similarCountSelector,
      totalPagesCounter: totalPagesCounterSelector,
    },
    {
      loadPayment: ACTIONS.load,
      onClose: ACTIONS.closeDrawer,
      onLoad: ACTIONS.loadSimilarPayments,
      onLoadMore: ACTIONS.loadMoreSimilarPayments,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loading) {
        this.props.onLoad(this.props.paymentsCount)
      }
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(SimilarPayments)
