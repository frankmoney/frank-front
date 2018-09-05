import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription, { Em } from '../../StepDescription'

const styles = {
  root: {},
}

const AccountInfo = ({ className, classes }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepTitle>Account info</StepTitle>
    <StepDescription>
      This is a public <Em>name</Em> and a <Em>short description</Em> of your
      new Frank account.
      <br />
      It could be named after the project you’re working on or even after
      <br />
      your entire organization if that’s what this is.
    </StepDescription>
  </StepLayout>
)

export default injectStyles(styles)(AccountInfo)
