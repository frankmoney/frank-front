// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import Helmet from 'react-helmet'
import SimilarIcon from 'material-ui-icons/FormatListBulleted'
import { Page404 as NotFound } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Button from 'components/kit/Button'
import CurrencyProvider from 'components/CurrencyProvider'
import PaymentCard from 'components/public/PaymentCard'
import { type Account } from 'data/models/account'
import {
  type Payment as PaymentProps,
  type PaymentId,
} from 'data/models/payment'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { BASE_TITLE } from 'const'
import PaymentHeader from './PaymentHeader'
import {
  accountSelector,
  isLoadedSelector,
  isLoadingSelector,
  isPrivateSelector,
  paymentSelector,
} from './selectors'
import ACTIONS from './actions'
import SimilarDrawer from './SimilarDrawer'
import styles from './Payment.jss'

type Props = {|
  ...InjectStylesProps,
  //
  account: Account,
  payment: PaymentProps,
  paymentId: PaymentId,
  onOpenDrawer: () => void,
|}

const Payment = ({
  classes,
  className,
  account,
  payment,
  paymentId,
  onOpenDrawer,
}: Props) => {
  const { similarCount, ...paymentProps } = payment
  return (
    <div className={cx(classes.paymentPage, className)}>
      <Helmet title={BASE_TITLE} />
      <PaymentHeader />
      <div className={classes.container}>
        <CurrencyProvider code={account.currencyCode}>
          <PaymentCard
            className={classes.card}
            {...paymentProps}
            paperPadding={30}
          />
          {typeof similarCount === 'number' &&
            similarCount > 0 && (
              <>
                <Button
                  className={classes.similarButton}
                  icon={<SimilarIcon />}
                  label={`${similarCount} similar payments`}
                  onClick={() => onOpenDrawer()}
                />
                <SimilarDrawer paymentId={paymentId} />
              </>
            )}
        </CurrencyProvider>
      </div>
    </div>
  )
}

export default compose(
  reconnect(
    {
      account: accountSelector,
      isLoaded: isLoadedSelector,
      isLoading: isLoadingSelector,
      isPrivate: isPrivateSelector,
      payment: paymentSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      loadSimilarPayments: ACTIONS.loadSimilarPayments,
      onOpenDrawer: ACTIONS.openDrawer,
    }
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      // React on url change (similar payments click)
      if (
        !this.props.isLoading &&
        this.props.paymentId !== nextProps.paymentId
      ) {
        this.props.load({
          accountId: nextProps.accountId,
          paymentId: nextProps.paymentId,
        })
      }
    },
    componentWillMount() {
      if (!this.props.isLoaded) {
        this.props.load({
          accountId: this.props.accountId,
          paymentId: this.props.paymentId,
        })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.isPrivate, renderComponent(NotFound)),
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles, { fixedGrid: true })
)(Payment)
