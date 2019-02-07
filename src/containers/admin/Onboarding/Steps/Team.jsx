// @flow
import reconnect from 'utils/reconnect'
import Team from 'components/onboarding/Steps/Team'
import {
  isInviteDrawerOpenSelector,
  teamInvitesSelector,
  teamMembersSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

export default reconnect(
  {
    invites: teamInvitesSelector,
    members: teamMembersSelector,
    drawerOpen: isInviteDrawerOpenSelector,
  },
  {
    onAddMemberClick: () => ACTIONS.openInvite(),
    onCloseDrawer: ACTIONS.closeInvite,
    onSubmitInvite: ACTIONS.submitInvite,
  }
)(Team)
