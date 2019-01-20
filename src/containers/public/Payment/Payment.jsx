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
import { type Payment as PaymentProps } from 'data/models/payment'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { BASE_TITLE } from 'const'
import PaymentHeader from './PaymentHeader'
import {
  accountSelector,
  isLoadedSelector,
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
  onOpenDrawer: () => void,
|}

const Payment = ({
  classes,
  className,
  account,
  payment,
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
                <SimilarDrawer />
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
