import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import BankLogo from 'components/BankLogo'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 50,
    height: 50,
  },
  name: {
    marginTop: 20,
    ...theme.fontMedium(20, 28),
    color: '#20284A',
  },
})

const StepBankLogo = ({ className, classes, bankName, bankLogoUrl }) => (
  <div className={cx(classes.root, className)}>
    <BankLogo className={classes.logo} src={bankLogoUrl} alt={bankName} />
    <div className={classes.name}>{bankName}</div>
  </div>
)

export default injectStyles(styles)(StepBankLogo)
