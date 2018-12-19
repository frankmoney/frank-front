// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { required, email } from '@frankmoney/forms'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'
import ACTIONS from './actions'
import { FORM_NAME } from './const'
import { busySelector } from './selectors'

const styles = {
  root: {},
  field: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 70,
  },
}

const validation = {
  email: [required, email],
  password: [required],
}

const SignInForm = ({ classes, className, submit, busy, invalid }) => (
  <div className={cx(classes.root, className)}>
    <ReduxFormControl.Field
      name="email"
      validate={validation.email}
      component={TextField}
      className={classes.field}
      floatingLabel="Email"
      type="email"
      stretch
      larger
      autoFocus
    />
    <ReduxFormControl.Field
      name="password"
      validate={validation.password}
      component={TextField}
      className={classes.field}
      floatingLabel="Password"
      type="password"
      stretch
      larger
    />
    <Button
      className={classes.submitButton}
      type="submit"
      color="green"
      label="Sign in"
      stretch
      loading={busy}
      disabled={invalid}
      onClick={() => submit()}
    />
  </div>
)

export default compose(
  reconnect(
    { busy: busySelector },
    {
      signIn: ACTIONS.signIn,
    }
  ),
  reduxForm({
    form: FORM_NAME,
    onSubmit: (data, dispatch, { signIn }) => signIn(data.toJS()),
  }),
  injectStyles(styles)
)(SignInForm)
