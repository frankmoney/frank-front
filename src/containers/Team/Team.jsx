import React from 'react'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
  PageLoader,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import * as R from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push as pushLocation } from 'react-router-redux'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { createStructuredSelector } from 'reselect'
import ListLayoutContent from 'components/ListLayoutContent'
import { ROUTES } from 'const'
import EditRoleDrawer from './EditRoleDrawer'
import InviteButton from './InviteButton'
import InviteDrawer from './InviteDrawer'
import OwnProfile from './OwnProfile'
import ProfileList from './ProfileList'
import ACTIONS from './actions'
import {
  canInviteSelector,
  loadedSelector,
  loadingSelector,
  otherProfilesSelector,
  ownProfileSelector,
} from './selectors'

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  loading: loadingSelector,
  canInvite: canInviteSelector,
  ownProfile: ownProfileSelector,
  otherProfiles: otherProfilesSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    handleEditRole: ACTIONS.openEditRoleDrawer,
    handleDrawerClose: () => pushLocation(createRouteUrl(ROUTES.team.root)),
  },
])

const Team = ({
  match: {
    params: { id, action },
  },
  canInvite,
  ownProfile,
  otherProfiles,
  handleEditRole,
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
      <ProfileList profiles={otherProfiles} onEditRole={handleEditRole} />
    </ListLayoutContent>
    <InviteDrawer open={action === 'invite'} />
    <EditRoleDrawer open={action === 'edit-role' && id} id={id} />
  </>
)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
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
  branch(props => !props.loaded || props.loading, renderComponent(PageLoader))
)(Team)
