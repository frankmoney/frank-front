import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { TextField } from '@frankmoney/components'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepBankLogo from '../../StepBankLogo'

const styles = {
  root: {},
  form: {
    marginTop: 50,
  },
  field: {
    marginTop: 30,
    width: 370,
    display: 'flex',
  },
}

const Credentials = ({ className, classes }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText="We don’t store your credentials, we transfer it to the aggregation system."
  >
    <StepBankLogo />
    <StepTitle>Enter your credentials</StepTitle>
    <div className={classes.form}>
      <TextField autoFocus className={classes.field} label="Login" />
      <TextField className={classes.field} label="Password" type="password" />
    </div>
  </StepLayout>
)

export default injectStyles(styles)(Credentials)
