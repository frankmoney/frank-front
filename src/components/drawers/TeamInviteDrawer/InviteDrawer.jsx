// @flow strict-local
import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { email as validateEmail, required } from '@frankmoney/forms'
import SendIcon from 'material-ui-icons/Send'
import Drawer from 'components/kit/Drawer'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'

const validation = {
  email: [validateEmail, required],
}

const InviteDrawer = ({
  email,
  role,
  note,
  onEmailChange,
  onNoteChange,
  onRoleChange,
  submit,
  invalid,
  loading,
  ...props
}) => (
  <Drawer
    footerTextSmaller
    footerButtonProps={{
      label: 'Send invitation',
      icon: <SendIcon />,
      disabled: invalid,
      onClick: submit,
      loading,
    }}
    title="Invite a teammate"
    {...props}
  >
    <Drawer.Content>
      <Drawer.Field label="Email">
        <ReduxFormControl.Field
          name="email"
          component={TextField}
          placeholder="example@mail.com"
          stretch
          validate={validation.email}
        />
      </Drawer.Field>
      <Drawer.Field label="Note">
        <ReduxFormControl.Field
          component={TextField}
          name="note"
          placeholder="Please help me out with connecting our bank account to Frank"
          multiLine
          minLines={2}
          stretch
        />
      </Drawer.Field>
    </Drawer.Content>
  </Drawer>
)

export default compose(
  withPropsOnChange(['onSubmit'], props => ({
    onSubmit: data => props.onSubmit(data.toJS()),
  })),
  reduxForm({
    form: 'team-invite',
  })
)(InviteDrawer)
