import SendIcon from 'material-ui-icons/Send'
import React from 'react'
import Drawer from 'components/kit/Drawer'
import EmailField from './EmailField'
import NoteField from './NoteField'
import RoleField from './RoleField'

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
  <Drawer
    footerText={
      <span>
        We will notify you via email when<br />
        your teammate accepts your invitation
      </span>
    }
    footerTextSmaller
    footerButtonProps={{
      label: 'Send invitation',
      icon: <SendIcon />,
      disabled: invalid,
      onClick: onSubmit,
    }}
    title="Invite a teammate"
    {...props}
  >
    <Drawer.Content>
      <EmailField value={email} onChange={onEmailChange} />
      <RoleField value={role} onChange={onRoleChange} />
      <NoteField value={note} onChange={onNoteChange} />
    </Drawer.Content>
  </Drawer>
)

export default InviteDrawer
