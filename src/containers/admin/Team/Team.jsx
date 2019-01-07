// @flow strict-local
import React from 'react'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import ListLayoutContent from 'components/ListLayoutContent'
import reconnect from 'utils/reconnect'
import InviteButton from './InviteButton'
import InviteDrawer from './InviteDrawer'
import OwnProfile from './OwnProfile'
import ProfileList from './ProfileList'
import ACTIONS from './actions'
import {
  canInviteSelector,
  inviteDrawerOpenSelector,
  invitesSelector,
  loadedSelector,
  loadingSelector,
  otherProfilesSelector,
  ownProfileSelector,
} from './selectors'

const Team = ({
  canInvite,
  invites,
  ownProfile,
  otherProfiles,
  inviteDrawerOpen,
}) => (
  <>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Team</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <ListLayoutContent>
      {canInvite && <InviteButton />}
      <OwnProfile profile={ownProfile} />
      <ProfileList profiles={otherProfiles} invites={invites} />
    </ListLayoutContent>
    <InviteDrawer open={inviteDrawerOpen} />
  </>
)

export default compose(
  reconnect(
    {
      loaded: loadedSelector,
      loading: loadingSelector,
      canInvite: canInviteSelector,
      ownProfile: ownProfileSelector,
      invites: invitesSelector,
      otherProfiles: otherProfilesSelector,
      inviteDrawerOpen: inviteDrawerOpenSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => !props.loaded || props.loading, renderComponent(AreaSpinner))
)(Team)
