// @flow strict-local
import React from 'react'
import { required, email } from '@frankmoney/forms'
import { createRouteUrl } from '@frankmoney/utils'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose, withState } from 'recompose'
import { reduxForm } from 'redux-form-actions/immutable'
import { ROUTES } from 'const'
import SidebarSnack from 'components/SidebarSnack/SidebarSnack'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'
import { injectStyles } from 'utils/styles'
import ACTIONS from './actions'

const styles = theme => ({
  root: {},
  field: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 70,
  },
  forgotPasswordLink: {
    display: 'block',
    marginTop: 20,
    width: '100%',
    flexGrow: 1,
    color: '#4c51f3',
    textAlign: 'center',
    textDecoration: 'none',
    ...theme.fontRegular(16),
  },
})

const validation = {
  email: [required, email],
  password: [required],
}

const SignInForm = ({
  classes,
  className,
  invalidCredentialsSnackOpen,
  invalid,
  submitting,
  submit,
  showInvalidCredentialsSnack,
}) => (
  <>
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
        loading={submitting}
        onClick={submit}
      />
      <Link
        className={classes.forgotPasswordLink}
        to={createRouteUrl(ROUTES.auth.recoverPassword)}
      >
        Forgot password?
      </Link>
      <SidebarSnack
        color="red"
        shown={invalidCredentialsSnackOpen}
        message="Invalid credentials"
        onDismiss={() => showInvalidCredentialsSnack(false)}
      />
    </div>
  </>
)

const FORM_NAME = 'auth/signIn'

export default compose(
  withState(
    'invalidCredentialsSnackOpen',
    'showInvalidCredentialsSnack',
    false
  ),
  reduxForm({
    form: FORM_NAME,
    failedAction: ACTIONS.submit.error.toString(),
    succeededAction: ACTIONS.submit.success.toString(),
    onSubmit: (data, dispatch) => dispatch(ACTIONS.submit(data.toJS())),
  }),
  injectStyles(styles)
)(SignInForm)
