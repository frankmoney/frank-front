import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { GiantButton } from '@frankmoney/components'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import { teamMembersSelector } from '../../selectors'
import InviteDrawer from './InviteDrawer'
import Invites from './Invites'

const styles = {
  root: {},
  inviteButton: {
    width: 550,
    marginTop: 50,
  },
  list: {
    marginTop: 40,
  },
}

const Team = ({ className, classes, members }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepTitle>Invite teammates</StepTitle>
    <StepDescription>
      Invite your team members and assign roles to work together faster<br />
      and avoid bottlenecks in your workflow
    </StepDescription>
    <GiantButton className={classes.inviteButton}>
      Invite a teammate
    </GiantButton>
    <Invites className={classes.list} invites={members} />
    <InviteDrawer open />
  </StepLayout>
)

const mapStateToProps = createStructuredSelector({
  members: teamMembersSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(Team)
