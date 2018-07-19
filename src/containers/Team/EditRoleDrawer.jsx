import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Drawer from 'components/Drawer'
import AccessField from './form/AccessField'
import AdminField from './form/AdminField'
import CanInviteField from './form/CanInviteField'
import { otherProfilesSelector, ownProfileSelector } from './selectors'

const mapStateToProps = (state, { id }) => {
  const profiles = [ownProfileSelector(state), ...otherProfilesSelector(state)]
  const profile = R.find(R.propEq('id', id), profiles) || { access: [] }
  return {
    admin: profile.admin,
    canInvite: profile.canInvite,
    lastName: profile.lastName,
    firstName: profile.firstName,
    access: R.fromPairs(profile.access.map(x => [x, true])),
    accessItems: [
      { id: '1', name: 'Charity water' },
      { id: '2', name: 'Frank Money Inc' },
      { id: '3', name: 'Friends of Frank' },
      { id: '4', name: 'Team One Limited' },
      { id: '5', name: 'Bystrov Tochka' },
    ],
  }
}

const styles = {
  footer: {
    boxShadow: 'none',
  },
}

const EditRoleDrawer = ({
  classes,
  id,
  admin,
  canInvite,
  lastName,
  firstName,
  access,
  accessItems,
  ...otherProps
}) => (
  <Drawer {...otherProps}>
    <Drawer.Header>
      <Drawer.Title>Edit role</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <AdminField checked={admin} />
      {admin || (
        <>
          <AccessField items={accessItems} access={access} />
          <CanInviteField checked={canInvite} />
        </>
      )}
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      Editing {firstName} {lastName}
      <Button className={classes.doneButton} fat type="primary" label="Done" />
    </Drawer.Footer>
  </Drawer>
)

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(EditRoleDrawer)
