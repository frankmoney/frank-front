// @flow strict-local
import React from 'react'
import { required, email } from '@frankmoney/forms'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form-actions/immutable'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'
import { injectStyles } from 'utils/styles'
import ACTIONS from './actions'

const styles = {
  field: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 70,
  },
}

const validation = {
  email: [required, email],
}

const RecoverPasswordForm = ({ classes, invalid, submitting, submit }) => (
  <div>
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
    <Button
      className={classes.submitButton}
      type="submit"
      color="blue"
      label="Send reset link"
      stretch
      disabled={invalid}
      loading={submitting}
      onClick={submit}
    />
  </div>
)

const FORM_NAME = 'auth/recoverPassword'

export default compose(
  reduxForm({
    form: FORM_NAME,
    failedAction: ACTIONS.submit.error.toString(),
    succeededAction: ACTIONS.submit.success.toString(),
    onSubmit: (data, dispatch) => dispatch(ACTIONS.submit(data.toJS())),
  }),
  injectStyles(styles)
)(RecoverPasswordForm)
