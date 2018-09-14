import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import OptionsList, { OptionsListItem } from '../../OptionsList'
import StepBankLogo from '../../StepBankLogo'

const styles = {
  root: {},
  answers: {
    marginTop: 50,
  },
}

const Verify = ({ className, classes }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepBankLogo />
    <StepTitle>Verify your identity</StepTitle>
    <StepDescription>I say tomato you say:</StepDescription>
    <OptionsList className={classes.answers}>
      <OptionsListItem selected primaryText="Potato" />
      <OptionsListItem primaryText="Tomato" />
      <OptionsListItem primaryText="Peach" />
      <OptionsListItem primaryText="Apple" />
    </OptionsList>
  </StepLayout>
)

export default injectStyles(styles)(Verify)
