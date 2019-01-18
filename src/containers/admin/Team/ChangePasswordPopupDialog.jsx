// @flow strict-local
import React from 'react'
import { reduxForm, reset } from 'redux-form/immutable'
import { compose } from 'recompose'
import { confirmation, required } from '@frankmoney/forms'
import PopoverDialog from 'components/kit/PopoverDialog'
import TextField from 'components/kit/TextField'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import { injectStyles } from 'utils/styles'

const styles = {
  password: {
    marginBottom: 30,
  },
}

const validation = {
  // password: [minLength(6), maxLength(20)],
  password: [required],
  repeatPassword: [confirmation('password')],
}

const ChangePasswordPopoverDialog = ({
  classes,
  children,
  submit,
  invalid,
}) => (
  <PopoverDialog
    width={350}
    place="right"
    confirmLabel="Save"
    onConfirm={submit}
    confirmButtonProps={{ disabled: invalid }}
    button={children}
  >
    <ReduxFormControl.Field
      className={classes.password}
      name="password"
      validate={validation.password}
      component={TextField}
      stretch
      type="password"
      floatingLabel="New password"
    />
    <ReduxFormControl.Field
      name="repeatPassword"
      validate={validation.repeatPassword}
      component={TextField}
      stretch
      type="password"
      floatingLabel="Repeat password"
    />
  </PopoverDialog>
)

export default compose(
  reduxForm({
    form: 'change-password',
    onSubmit: (values, dispatch, props) => {
      if (typeof props.onConfirm === 'function') {
        props.onConfirm(values.get('password'))
        dispatch(reset('change-password'))
      }
    },
  }),
  injectStyles(styles)
)(ChangePasswordPopoverDialog)
