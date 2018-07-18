import React from 'react'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import * as R from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push as pushLocation } from 'react-router-redux'
import { createStructuredSelector } from 'reselect'
import ListLayoutContent from 'components/ListLayoutContent'
import { ROUTES } from 'const'
import EditRoleDrawer from './EditRoleDrawer'
import InviteButton from './InviteButton'
import OwnProfile from './OwnProfile'
import ProfileList from './ProfileList'
import { canInviteSelector } from './selectors'

const mapStateToProps = createStructuredSelector({
  canInvite: canInviteSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    handleDrawerClose: () => pushLocation(createRouteUrl(ROUTES.team.root)),
  },
])

const Team = ({
  canInvite,
  match: {
    params: { id, action },
  },
  handleDrawerClose,
}) => (
  <>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Team</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <ListLayoutContent>
      {canInvite && <InviteButton />}
      <OwnProfile />
      <ProfileList />
    </ListLayoutContent>
    <EditRoleDrawer
      open={action === 'edit-role' && id}
      id={id}
      onClose={handleDrawerClose}
    />
  </>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
