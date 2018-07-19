import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import SendIcon from 'material-ui-icons/Send'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Drawer from 'components/Drawer'
import AccessField from './form/AccessField'
import AdminField from './form/AdminField'
import CanInviteField from './form/CanInviteField'
import EmailField from './form/EmailField'
import NoteField from './form/NoteField'

const mapStateToProps = () => ({
  admin: false,
  canInvite: false,
  email: '',
  access: {},
  accessItems: [
    { id: '1', name: 'Charity water' },
    { id: '2', name: 'Frank Money Inc' },
    { id: '3', name: 'Friends of Frank' },
    { id: '4', name: 'Team One Limited' },
    { id: '5', name: 'Bystrov Tochka' },
  ],
  note: '',
})

const styles = theme => ({
  footer: {
    boxShadow: 'none',
  },
  sendHint: {
    ...theme.fontRegular(14, 20),
    color: 'rgba(37, 43, 67, .5)',
  },
  sendButton: {
    marginLeft: 100,
    whiteSpace: 'nowrap',
  },
})

const InviteDrawer = ({
  classes,
  id,
  admin,
  canInvite,
  email,
  access,
  accessItems,
  note,
  ...otherProps
}) => (
  <Drawer {...otherProps}>
    <Drawer.Header>
      <Drawer.Title>Edit role</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <EmailField value={email} />
      <AdminField checked={admin} />
      {admin || (
        <>
          <AccessField items={accessItems} access={access} />
          <CanInviteField checked={canInvite} />
        </>
      )}
      <NoteField value={note} />
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      <div className={classes.sendHint}>
        We will notify you via email when your teammate accepts your invitation
      </div>
      <Button
        className={classes.sendButton}
        primary
        label="Send invitation"
        icon={SendIcon}
      />
    </Drawer.Footer>
  </Drawer>
)

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(InviteDrawer)
