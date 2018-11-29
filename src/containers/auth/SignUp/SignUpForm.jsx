// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { required, email } from '@frankmoney/forms'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { injectStyles } from 'utils/styles'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'
import SelectField from 'components/kit/SelectField'
import { MenuItem } from 'components/kit/Menu'

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
  teamName: [required],
  teamSize: [required],
  city: [required],
  firstName: [required],
  lastName: [required],
  email: [required, email],
  password: [required],
}

const SignUpForm = ({ classes, className, submit }) => (
  <div className={cx(classes.root, className)}>
    <ReduxFormControl.Field
      name="teamName"
      validate={validation.teamName}
      component={TextField}
      className={classes.field}
      floatingLabel="Team name"
      stretch
      larger
      autoFocus
    />
    <ReduxFormControl.Field
      name="teamSize"
      validate={validation.teamSize}
      component={SelectField}
      className={classes.field}
      floatingLabel="Team size"
      stretch
      larger
    >
      <MenuItem label="1-5 people" value="1-5" />
      <MenuItem label="6-10 people" value="6-10" />
      <MenuItem label="10-20 people" value="10-20" />
      <MenuItem label="20+ people" value="20+" />
    </ReduxFormControl.Field>
    <ReduxFormControl.Field
      name="city"
      validate={validation.city}
      component={TextField}
      className={classes.field}
      floatingLabel="City"
      stretch
      larger
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
      label="Create new team"
      stretch
      onClick={() => submit()}
    />
  </div>
)

export default compose(
  reduxForm({ form: 'sign-up', onSubmit: () => {} }),
  injectStyles(styles)
)(SignUpForm)
