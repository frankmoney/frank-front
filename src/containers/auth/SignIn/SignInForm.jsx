import React from 'react'
import cx from 'classnames'
import { required, email } from '@frankmoney/forms'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { injectStyles } from 'utils/styles'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'

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

const SignInForm = ({ classes, className, submit, invalid }) => (
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
      disabled={invalid}
      onClick={() => submit()}
    />
  </div>
)

export default compose(
  reduxForm({
    form: 'sign-in',
    onSubmit: data => {
      window.location = `${window.location.origin}/login?user=${data.get(
        'email'
      )}`
    },
  }),
  injectStyles(styles)
)(SignInForm)
