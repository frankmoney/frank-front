import React from 'react'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import Helmet from 'react-helmet'
import { FormatListBulleted as SimilarIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { PageLoader } from '@frankmoney/components'
import reconnect from 'utils/reconnect'
import CurrencyProvider from 'components/CurrencyProvider'
import Button from 'components/kit/Button'
import PaymentCard from 'components/public/PaymentCard'
import { BASE_TITLE } from 'const'
import { formatMonthDate } from '../../../utils/dates'
import PaymentHeader from './PaymentHeader'
import { accountSelector, isLoadedSelector, paymentSelector } from './selectors'
import ACTIONS from './actions'
import styles from './Payment.jss'

const SimilarButton = ({ className, count, date }) => {
  const dateText = formatMonthDate(date, true)
  const labelText = `Show ${count > 1 &&
    'all'} ${count} similar payment${count > 1 && 's'} since ${dateText}`

  return (
    <Button
      className={className}
      color="blue"
      label={labelText}
      icon={<SimilarIcon />}
    />
  )
}

const Payment = ({
  classes,
  className,
  account: { currencyCode } = {},
  payment = {},
}) => (
  <div className={cx(classes.paymentPage, className)}>
    <Helmet title={BASE_TITLE} />
    <PaymentHeader />
    <div className={classes.container}>
      <CurrencyProvider code={currencyCode}>
        <PaymentCard className={classes.card} {...payment} />
        {payment.similarCount > 0 && (
          <SimilarButton
            className={classes.similarButton}
            count={payment.similarCount}
            date={payment.postedOn}
          />
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
  branch(props => !props.isLoaded, renderComponent(PageLoader)),
  injectStyles(styles, { fixedGrid: true })
)(Payment)
