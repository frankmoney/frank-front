import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Drawer from 'components/Drawer'
import { otherProfilesSelector, ownProfileSelector } from './selectors'

const mapStateToProps = (state, { id }) => {
  const profiles = [ownProfileSelector(state), ...otherProfilesSelector(state)]
  const profile = R.find(R.propEq('id', id), profiles) || {}
  return {
    lastName: profile.lastName,
    firstName: profile.firstName,
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
  lastName,
  firstName,
  ...otherProps
}) => (
  <Drawer {...otherProps}>
    <Drawer.Header>
      <Drawer.Title>Edit role</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <div>Administrator</div>
      <div>Access</div>
      <div>Can invite colleagues</div>
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      Editing {firstName} {lastName}
      <Button primary label="Done" />
    </Drawer.Footer>
  </Drawer>
)

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(EditRoleDrawer)
