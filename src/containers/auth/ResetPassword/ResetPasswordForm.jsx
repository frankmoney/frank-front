// @flow strict-local
import React from 'react'
import { confirmation, required } from '@frankmoney/forms'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form-actions/immutable'
import Button from 'components/kit/Button'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ACTIONS from './actions'
import { tokenSelector } from './selectors'

const styles = {
  field: {
    marginBottom: 20,
  },
}

const validation = {
  password: [required],
  passwordConfirmation: [confirmation('password')],
}

const ResetPasswordForm = ({ classes, invalid, submitting, submit }) => (
  <div>
    <ReduxFormControl.Field
      name="password"
      validate={validation.password}
      component={TextField}
      className={classes.field}
      floatingLabel="New password"
      type="password"
      stretch
      larger
    />
    <ReduxFormControl.Field
      name="passwordConfirmation"
      validate={validation.passwordConfirmation}
      component={TextField}
      className={classes.field}
      floatingLabel="New password again..."
      type="password"
      stretch
      larger
    />
    <Button
      className={classes.submitButton}
      type="submit"
      color="blue"
      label="Reset password"
      stretch
      disabled={invalid}
      loading={submitting}
      onClick={submit}
    />
  </div>
)

const FORM_NAME = 'auth/resetPassword'

export default compose(
  reconnect({ token: tokenSelector }),
  reduxForm({
    form: FORM_NAME,
    failedAction: ACTIONS.submit.error,
    succeededAction: ACTIONS.submit.success,
    onSubmit: (data, dispatch, { token }) =>
      dispatch(
        ACTIONS.submit({
          token,
          ...data.toJS(),
        })
      ),
  }),
  injectStyles(styles)
)(ResetPasswordForm)
