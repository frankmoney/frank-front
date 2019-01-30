// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { BigButton } from 'components/kit/Button'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'
import StepLayout from 'containers/admin/Onboarding/StepLayout'
import {
  isInviteDrawerOpenSelector,
  teamInvitesSelector,
  teamMembersSelector,
} from '../../selectors'
import * as ACTIONS from '../../actions'
import InviteDrawer from './InviteDrawer'
import Invites from './Invites'
import Members from './Members'

const styles = theme => ({
  root: {},
  content: {
    width: 550,
    paddingBottom: 70,
  },
  inviteButton: {
    width: '100%',
    marginTop: 50,
  },
  list: {
    marginTop: 35,
  },
  title: {
    marginTop: 50,
    color: '#252B43',
    ...theme.fontRegular(22, 22),
  },
})

const Team = ({
  className,
  classes,
  members,
  invites,
  drawerOpen,
  onAddMemberClick,
  onCloseDrawer,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    backLabel="Back to categories"
  >
    <StepTitle>Invite teammates</StepTitle>
    <StepDescription>
      Invite your team members and assign roles to work together faster<br />
      and avoid bottlenecks in your workflow
    </StepDescription>
    <div className={classes.content}>
      <BigButton
        className={classes.inviteButton}
        onClick={onAddMemberClick}
        label="Invite a teammate"
      />
      {invites.length > 0 && <div className={classes.title}>Invited</div>}
      {invites.length > 0 && (
        <Invites className={classes.list} invites={invites} />
      )}
      {members.length > 0 && <div className={classes.title}>Team</div>}
      {members.length > 0 && (
        <Members className={classes.list} members={members} />
      )}
      <InviteDrawer open={drawerOpen} onClose={onCloseDrawer} />
    </div>
  </StepLayout>
)

export default compose(
  reconnect(
    {
      invites: teamInvitesSelector,
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
