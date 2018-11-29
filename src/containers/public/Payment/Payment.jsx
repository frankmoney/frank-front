// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import Helmet from 'react-helmet'
import SimilarIcon from 'material-ui-icons/FormatListBulleted'
import AreaSpinner from 'components/AreaSpinner'
import Button from 'components/kit/Button'
import CurrencyProvider from 'components/CurrencyProvider'
import PaymentCard from 'components/public/PaymentCard'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import { BASE_TITLE } from 'const'
import PaymentHeader from './PaymentHeader'
import { accountSelector, isLoadedSelector, paymentSelector } from './selectors'
import ACTIONS from './actions'
import SimilarDrawer from './SimilarDrawer'
import styles from './Payment.jss'

const Payment = ({
  classes,
  className,
  account: { currencyCode } = {},
  payment = {},
  onOpenDrawer,
}) => (
  <div className={cx(classes.paymentPage, className)}>
    <Helmet title={BASE_TITLE} />
    <PaymentHeader />
    <div className={classes.container}>
      <CurrencyProvider code={currencyCode}>
        <PaymentCard className={classes.card} {...payment} paperPadding={30} />
        {payment.similarCount > 0 && (
          <>
            <Button
              className={classes.similarButton}
              icon={<SimilarIcon />}
              label={`${payment.similarCount} similar payments`}
              onClick={() => onOpenDrawer()}
            />
            <SimilarDrawer />
          </>
        )}
      </CurrencyProvider>
    </div>
  </div>
)

export default compose(
  reconnect(
    {
      isLoaded: isLoadedSelector,
      payment: paymentSelector,
      account: accountSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      loadSimilarPayments: ACTIONS.loadSimilarPayments,
      onOpenDrawer: ACTIONS.openDrawer,
    }
  ),
  lifecycle({
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
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles, { fixedGrid: true })
)(Payment)
