import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import BankLogo from 'components/BankLogo'
import {
  selectedBankLogoSelector,
  selectedBankNameSelector,
} from '../selectors'

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

const mapStateToProps = createStructuredSelector({
  bankName: selectedBankNameSelector,
  bankLogoUrl: selectedBankLogoSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(StepBankLogo)
