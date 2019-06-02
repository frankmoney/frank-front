// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { createRouteUrl } from '@frankmoney/utils'
import BackIcon from 'material-ui-icons/ArrowBack'
import Header from 'components/public/Header'
import { type Account } from 'data/models/account'
import { type PaymentId } from 'data/models/payment'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from 'const'
import { accountSelector, paymentIdSelector } from './selectors'
import ShareMenu from './ShareMenu'

const PADDING = 29

const styles = theme => ({
  container: {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    padding: [0, PADDING],
  },
  back: {
    ...theme.fontMedium(18, 28),
    position: 'absolute',
    top: 5,
    left: PADDING,
    display: 'flex',
    alignItems: 'center',
    color: '#8F939F',
    textDecoration: 'none',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    ...theme.fontMedium(24, 40),
    color: '#20284A',
  },
  share: {
    position: 'absolute',
    top: 3,
    right: PADDING,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  account: Account,
  paymentId: PaymentId,
|}

const PaymentHeader = ({
  account: { id: accountId, name },
  classes,
  className,
  paymentId,
}: Props) => (
  <Header>
    <div className={cx(classes.container, className)}>
      <Link
        className={classes.back}
        to={createRouteUrl(ROUTES.account.idRoot, { accountId })}
      >
        <BackIcon className={classes.backIcon} />
        <div>All payments</div>
      </Link>
      <div className={classes.title}>{name}</div>
      <ShareMenu
        className={classes.share}
        url={createRouteUrl(ROUTES.account.payment.idRoot, {
          accountId,
          paymentId,
        })}
      />
    </div>
  </Header>
)

export default compose(
  reconnect(
    {
      account: accountSelector,
      paymentId: paymentIdSelector,
    },
    {}
  ),
  injectStyles(styles)
)(PaymentHeader)
