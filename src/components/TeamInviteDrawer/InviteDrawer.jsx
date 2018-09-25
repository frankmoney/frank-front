import React from 'react'
import Drawer from 'components/Drawer/index'
import Invite from './Invite'

const InviteDrawer = ({
  email,
  role,
  note,
  onEmailChange,
  onNoteChange,
  onRoleChange,
  onSubmit,
  invalid,
  ...props
}) => (
  <Drawer {...props}>
    <Invite
      email={email}
      role={role}
      note={note}
      onEmailChange={onEmailChange}
      onNoteChange={onNoteChange}
      onRoleChange={onRoleChange}
      onSubmit={onSubmit}
      invalid={invalid}
    />
  </Drawer>
)

export default InviteDrawer
