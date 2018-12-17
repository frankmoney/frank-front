// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { injectStyles } from 'utils/styles'
import BankLogo from 'components/BankLogo'
import CurrencyDelta from 'components/CurrencyDelta'
import TextButton from 'components/kit/Button/TextButton'
import { formatShortDate } from 'utils/dates'

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: 45,
    width: '100%',
  },
  icon: {
    minWidth: 50,
    marginRight: 20,
    marginTop: 5,
  },
  account: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rowMedium: {
    composes: '$row',
    ...theme.fontMedium(20, 30),
  },
  rowRegular: {
    composes: '$row',
    ...theme.fontRegular(20, 30),
  },
  digits: {
    marginLeft: 8,
    opacity: 0.3,
    fontWeight: 400,
  },
  statusGreen: {
    color: theme.colors.green,
  },
  statusRed: {
    color: theme.colors.red,
  },
  date: {
    opacity: 0.3,
  },
  warning: {
    borderRadius: 6,
    backgroundColor: 'rgba(246, 40, 40, 0.05)',
    padding: 20,
    marginTop: 15,
    ...theme.fontRegular(16, 26),
  },
  warningText: {
    opacity: 0.5,
  },
  warningAccent: {
    fontWeight: 500,
  },
  warningLink: {
    textDecoration: 'none',
  },
})

const BankItem = ({
  classes,
  className,
  bankLogo,
  bankLink,
  accountName,
  accountFourDigits,
  accountBalance,
  accountStatus,
  accountNextUpdate,
  accountLastUpdate,
}) => (
  <div className={cx(classes.root, className)}>
    <BankLogo className={classes.icon} src={bankLogo} />
    <div className={classes.account}>
      <div className={classes.info}>
        <div className={classes.rowMedium}>
          <div>
            <span className={classes.name}>{accountName}</span>
            <span className={classes.digits}>··· {accountFourDigits}</span>
          </div>
          <div
            className={cx({
              [classes.statusGreen]: accountStatus === 'connected',
              [classes.statusRed]: accountStatus !== 'connected',
            })}
          >
            {accountStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        <div className={classes.rowRegular}>
          <div className={classes.balance}>
            <CurrencyDelta
              className={classes.totalSum}
              value={accountBalance}
            />
          </div>
          <div className={classes.date}>
            {accountStatus === 'connected' ? 'Updates' : 'Updated'}{' '}
            {formatShortDate(
              accountStatus === 'connected'
                ? accountNextUpdate
                : accountLastUpdate
            )}
          </div>
        </div>
      </div>
      {accountStatus !== 'connected' && (
        <div className={classes.warning}>
          <div className={classes.warningText}>
            <span className={classes.warningAccent}>
              Update your credentials.
            </span>{' '}
            The credentials you entered do not match those of your banking
            institution.
          </div>
          <br />
          <div className={classes.warningLinks}>
            <Link className={classes.warningLink} to={'#'}>
              <TextButton
                label="Enter your new login information"
                color="blue"
              />
            </Link>
            <br />
            <a className={classes.warningLink} href={bankLink}>
              <TextButton
                label="Go to your institution’s website"
                color="blue"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  </div>
)

export default injectStyles(styles)(BankItem)