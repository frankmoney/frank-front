// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { BigButton } from 'components/kit/Button'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import {
  isInviteDrawerOpenSelector,
  teamMembersSelector,
} from '../../selectors'
import * as ACTIONS from '../../actions'
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

const Team = ({
  className,
  classes,
  members,
  drawerOpen,
  onAddMemberClick,
  onCloseDrawer,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    backButtonText="Back to categories"
  >
    <StepTitle>Invite teammates</StepTitle>
    <StepDescription>
      Invite your team members and assign roles to work together faster<br />
      and avoid bottlenecks in your workflow
    </StepDescription>
    <BigButton
      className={classes.inviteButton}
      onClick={onAddMemberClick}
      label="Invite a teammate"
    />
    <Invites className={classes.list} invites={members} />
    <InviteDrawer open={drawerOpen} onClose={onCloseDrawer} />
  </StepLayout>
)

export default compose(
  reconnect(
    {
      members: teamMembersSelector,
      drawerOpen: isInviteDrawerOpenSelector,
    },
    {
      onAddMemberClick: () => ACTIONS.openInvite(),
      onCloseDrawer: ACTIONS.closeInvite,
    }
  ),
  injectStyles(styles)
)(Team)
