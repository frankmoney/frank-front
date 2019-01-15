// @flow strict-local
import React from 'react'
import { email, required } from '@frankmoney/forms'
import cx from 'classnames'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form-actions/immutable'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ACTIONS from './actions'
import {
  inviteSelector,
  createUserFormInitialValuesSelector,
} from './selectors'

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
  firstName: [required],
  email: [required, email],
  password: [required],
}

const CreateUserForm = ({
  classes,
  className,
  invite: {
    team: { name: teamName },
  },
  invalid,
  submitting,
  submit,
}) => (
  <div className={cx(classes.root, className)}>
    <ReduxFormControl.Field
      name="teamName"
      validate={validation.teamName}
      component={TextField}
      className={classes.field}
      floatingLabel="Team name"
      stretch
      larger
      disabled
    />
    <ReduxFormControl.Field
      name="phone"
      validate={validation.phone}
      component={TextField}
      className={classes.field}
      floatingLabel="Phone number"
      placeholder="123 456 7890"
      stretch
      larger
      autoFocus
    />
    <ReduxFormControl.Field
      name="firstName"
      validate={validation.firstName}
      component={TextField}
      className={classes.field}
      floatingLabel="First name"
      stretch
      larger
    />
    <ReduxFormControl.Field
      name="lastName"
      validate={validation.lastName}
      component={TextField}
      className={classes.field}
      floatingLabel="Second name"
      stretch
      larger
    />
    <ReduxFormControl.Field
      name="email"
      validate={validation.email}
      component={TextField}
      className={classes.field}
      floatingLabel="Work email"
      type="email"
      stretch
      larger
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
      label={`Join ${teamName}`}
      stretch
      disabled={invalid}
      loading={submitting}
      onClick={submit}
    />
  </div>
)

const FORM_NAME = 'auth/acceptInvitation/createUser'

export default compose(
  reconnect({
    invite: inviteSelector,
    initialValues: createUserFormInitialValuesSelector,
  }),
  reduxForm({
    form: FORM_NAME,
    failedAction: ACTIONS.createUser.error.toString(),
    succeededAction: ACTIONS.createUser.success.toString(),
    onSubmit: (data, dispatch) => dispatch(ACTIONS.createUser(data.toJS())),
  }),
  injectStyles(styles)
)(CreateUserForm)
