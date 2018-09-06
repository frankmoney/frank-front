import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'

const styles = {
  root: {},
}

const Team = ({ className, classes }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepTitle>Invite teammates</StepTitle>
    <StepDescription>
      Invite your team members and assign roles to work together faster<br />
      and avoid bottlenecks in your workflow
    </StepDescription>
  </StepLayout>
)

export default injectStyles(styles)(Team)
