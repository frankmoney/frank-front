import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'

const styles = {
  root: {},
}

const Categories = ({ className, classes }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepTitle>List your categories</StepTitle>
    <StepDescription>
      To visualise your spending we require every payment to be categorized.
      <br />Please list all categories of your spending. You can edit it later
      <br />in the account settings.
    </StepDescription>
  </StepLayout>
)

export default injectStyles(styles)(Categories)
