import React from 'react'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import PageLoader from 'components/GrayPageLoader'
import ListLayoutContent from 'components/ListLayoutContent'
import Breadcrumbs from 'components/Breadcrumbs'
import reconnect from 'utils/reconnect'
import InviteButton from './InviteButton'
import InviteDrawer from './InviteDrawer'
import OwnProfile from './OwnProfile'
import ProfileList from './ProfileList'
import ACTIONS from './actions'
import {
  canInviteSelector,
  inviteDrawerOpenSelector,
  loadedSelector,
  loadingSelector,
  otherProfilesSelector,
  ownProfileSelector,
} from './selectors'

const selectorsToProps = {
  loaded: loadedSelector,
  loading: loadingSelector,
  canInvite: canInviteSelector,
  ownProfile: ownProfileSelector,
  otherProfiles: otherProfilesSelector,
  inviteDrawerOpen: inviteDrawerOpenSelector,
}

const connectDispatch = {
  load: ACTIONS.load,
  leave: ACTIONS.leave,
}

const Team = ({ canInvite, ownProfile, otherProfiles, inviteDrawerOpen }) => (
  <>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Team</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <ListLayoutContent>
      {canInvite && <InviteButton />}
      <OwnProfile profile={ownProfile} />
      <ProfileList profiles={otherProfiles} />
    </ListLayoutContent>
    <InviteDrawer open={inviteDrawerOpen} />
  </>
)

export default compose(
  reconnect(selectorsToProps, connectDispatch),
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
  branch(props => !props.loaded || props.loading, renderComponent(PageLoader))
)(Team)
