import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import Drawer from 'components/Drawer'
import AccessField from '../form/AccessField'
import AdminField from '../form/AdminField'
import CanInviteField from '../form/CanInviteField'
import ACTIONS from './actions'
import {
  loadedSelector,
  loadingSelector,
  lastNameSelector,
  firstNameSelector,
  adminSelector,
  canInviteSelector,
  accessSelector,
  accessItemsSelector,
} from './selectors'

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  loading: loadingSelector,
  lastName: lastNameSelector,
  firstName: firstNameSelector,
  admin: adminSelector,
  canInvite: canInviteSelector,
  access: accessSelector,
  accessItems: accessItemsSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    handleDoneClick: ACTIONS.submit,
    handleAdminChange: admin => ACTIONS.change({ admin }),
    handleCanInviteChange: canInvite => ACTIONS.change({ canInvite }),
  },
])

const styles = {
  footer: {
    boxShadow: 'none',
  },
}

const EditRole = ({
  classes,
  lastName,
  firstName,
  admin,
  canInvite,
  access,
  accessItems,
  handleAdminChange,
  handleCanInviteChange,
  handleDoneClick,
}) => (
  <>
    <Drawer.Header>
      <Drawer.Title>Edit role</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <AdminField checked={admin} onChange={handleAdminChange} />
      {admin || (
        <>
          <AccessField items={accessItems} access={access} />
          <CanInviteField
            checked={canInvite}
            onChange={handleCanInviteChange}
          />
        </>
      )}
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      Editing {firstName} {lastName}
      <Button fat type="primary" label="Done" onClick={handleDoneClick} />
    </Drawer.Footer>
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
        this.props.load({ id: this.props.id })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  injectStyles(styles)
)(EditRole)
