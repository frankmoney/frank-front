import { createRouteUrl } from '@frankmoney/utils'

// @flow strict-local
import React from 'react'
import cx from 'classnames'
import {
  compose,
  lifecycle,
  branch,
  renderComponent,
  renderNothing,
} from 'recompose'
import Helmet from 'react-helmet'
import SimilarIcon from 'material-ui-icons/FormatListBulleted'
import AreaSpinner from 'components/AreaSpinner'
import Button from 'components/kit/Button'
import CurrencyProvider from 'components/CurrencyProvider'
import NotFound from 'components/ErrorPage'
import PaymentCard from 'components/public/PaymentCard'
import { type Account } from 'data/models/account'
import {
  type Payment as PaymentProps,
  type PaymentId,
} from 'data/models/payment'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from 'const'
import CurrencyDelta from 'components/CurrencyDelta'
import PaymentHeader from './PaymentHeader'
import {
  accountSelector,
  isLoadedSelector,
  isLoadingSelector,
  isLoadFailedSelector,
  isNotFoundSelector,
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
  account: { id: accountId, currencyCode },
  payment,
  paymentId,
  onOpenDrawer,
}: Props) => {
  const { similarCount, ...paymentProps } = payment
  return (
    <CurrencyProvider code={currencyCode}>
      <div className={cx(classes.paymentPage, className)}>
        <CurrencyDelta.TextRender>
          {formatAmount => (
            <Helmet>
              <meta
                property="og:url"
                content={
                  __WEBAPP_BASE_URL +
                  createRouteUrl(ROUTES.account.payment.idRoot, {
                    accountId,
                    paymentId,
                  })
                }
              />
              <meta property="og:type" content="website" />
              <meta
                property="og:title"
                content={`${formatAmount(payment.amount)} payment ${
                  payment.peer
                    ? `from ${payment.peer.name}`
                    : ' with no description yet'
                }`}
              />
              {payment.description && (
                <meta property="og:description" content={payment.description} />
              )}
              <meta property="og:site_name" content="Frank" />
              <meta property="og:locale" content="en_US" />
            </Helmet>
          )}
        </CurrencyDelta.TextRender>
        <PaymentHeader />
        <div className={classes.container}>
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
        </div>
      </div>
    </CurrencyProvider>
  )
}

export default compose(
  reconnect(
    {
      account: accountSelector,
      isLoaded: isLoadedSelector,
      isLoading: isLoadingSelector,
      isPrivateOrNotFound: isNotFoundSelector,
      isLoadFailed: isLoadFailedSelector,
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
  branch(props => props.isLoadFailed, renderNothing),
  branch(props => props.isPrivateOrNotFound, renderComponent(NotFound)),
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles, { fixedGrid: true })
)(Payment)
