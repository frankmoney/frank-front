// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { branch, compose, renderComponent, lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import ShareIcon from 'material-ui-icons/Launch'
import AreaSpinner from 'components/AreaSpinner'
import BankDescription from 'components/common/BankDescription'
import Button, { IconPlainButton } from 'components/kit/Button'
import CategoryLabel from 'components/CategoryLabel'
import CurrencyProvider from 'components/CurrencyProvider'
import PaymentCardHead from 'components/public/PaymentCard/PaymentCardHead'
import { type Account } from 'data/models/account'
import { type Payment } from 'data/models/payment'
import reconnect from 'utils/reconnect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ACTIONS from 'containers/public/Payment/actions'
import { ROUTES } from 'const'
import {
  accountSelector,
  isLoadedSelector,
  paymentSelector,
} from 'containers/public/Payment/selectors'
import { createMobileUrl } from '../utils'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: [0, 20, 20],
    position: 'relative',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: {
    color: '#8F93A4',
    height: 63,
  },
  title: {
    ...theme.fontMedium(18),
    marginTop: -1,
  },
  share: {
    color: '#8F93A4',
    marginRight: -1,
  },
  head: {
    margin: [87, -1, 27, 0],
  },
  description: {
    ...theme.fontRegular(20, 28),
    color: '#8F93A4',
  },
  info: {
    marginTop: 5,
  },
  peer: {
    ...theme.fontMedium(18, 36),
    display: 'inline-block',
    marginRight: 21,
  },
  category: {
    ...theme.fontMedium(18, 26),
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  categoryIcon: {
    width: 14,
    height: 14,
    position: 'relative',
    top: 1,
  },
  bank: {
    margin: [18, 0, 30],
  },
  bankText: {
    fontSize: 11,
    lineHeight: 18,
  },
  similarButton: {
    marginTop: 'auto',
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  account: Account,
  payment: Payment,
|}

const PaymentPage = ({ account, classes, className, payment }: Props) => {
  console.log('render', account, payment)
  const { name, id, currencyCode } = account
  const {
    amount,
    category,
    description,
    peer,
    postedOn,
    similarCount,
    verified,
  } = payment

  const backUrl = createMobileUrl(ROUTES.account.idRoot, { accountId: id })

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.header}>
        <Link to={backUrl}>
          <IconPlainButton className={classes.back} icon={<ArrowBackIcon />} />
        </Link>
        <span className={classes.title}>{name}</span>
        <IconPlainButton
          className={classes.share}
          icon={<ShareIcon />}
          // onClick={onCancelCategory}
        />
      </div>
      <CurrencyProvider code={currencyCode}>
        <PaymentCardHead
          className={classes.head}
          amount={amount}
          postedOn={postedOn}
          verified={verified}
        />
        {verified && (
          <>
            {description && (
              <div className={classes.description}>{description}</div>
            )}
            <div className={classes.info}>
              {peer && <div className={classes.peer}>{peer.name}</div>}
              {category && (
                <CategoryLabel
                  className={classes.category}
                  iconClassName={classes.categoryIcon}
                  {...category}
                />
              )}
            </div>
          </>
        )}
        <BankDescription
          className={classes.bank}
          textClassName={classes.bankText}
        />
      </CurrencyProvider>
      {typeof similarCount === 'number' &&
        similarCount > 0 && (
          <Button
            className={classes.similarButton}
            label={`Show ${similarCount} similar payments`}
          />
        )}
    </div>
  )
}

export default compose(
  reconnect(
    {
      isLoaded: isLoadedSelector,
      payment: paymentSelector,
      account: accountSelector,
    },
    {
      load: ACTIONS.load,
      // leave: ACTIONS.leave,
      loadSimilarPayments: ACTIONS.loadSimilarPayments,
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
  }),
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(PaymentPage)
