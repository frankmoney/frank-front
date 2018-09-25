import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import SendIcon from 'material-ui-icons/Send'
import { compose } from 'recompose'
import Drawer from 'components/Drawer/index'
import EmailField from './EmailField'
import RoleField from './RoleField'
import NoteField from './NoteField'

const styles = theme => ({
  footer: {
    boxShadow: 'none',
  },
  sendHint: {
    ...theme.fontRegular(14, 20),
    color: 'rgba(37, 43, 67, .5)',
  },
})

const Invite = ({
  classes,
  email,
  role,
  note,
  invalid,
  onEmailChange,
  onNoteChange,
  onRoleChange,
  onSubmit,
}) => (
  <>
    <Drawer.Header>
      <Drawer.Title>Invite a teammate</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <EmailField value={email} onChange={onEmailChange} />
      <RoleField value={role} onChange={onRoleChange} />
      <NoteField value={note} onChange={onNoteChange} />
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      <div className={classes.sendHint}>
        We will notify you via email when<br />
        your teammate accepts your invitation
      </div>
      <Button
        fat
        type="primary"
        label="Send invitation"
        icon={SendIcon}
        disabled={invalid}
        onClick={onSubmit}
      />
    </Drawer.Footer>
  </>
)

export default compose(injectStyles(styles))(Invite)
