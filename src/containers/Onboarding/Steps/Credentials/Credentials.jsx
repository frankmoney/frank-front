import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import { Spinner } from '@frankmoney/components'
import { required, createValidateFromRules, TextField } from '@frankmoney/forms'
import cx from 'classnames'
import { compose, withPropsOnChange, branch, renderComponent } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import reconnect from 'utils/reconnect'
import { CREDENTIALS_FORM } from '../../constants'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
  isCredentialsErrorSelector,
} from '../../selectors'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepBankLogo from '../../StepBankLogo'
import CredentialsFail from './CredentialsFail'

const styles = {
  root: {},
  form: {
    marginTop: 50,
  },
  field: {
    marginTop: 30,
    width: 370,
    display: 'flex',
  },
  spinner: {
    marginTop: 70,
  },
}

const Credentials = ({ className, classes, fields, isChecking }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText={
      isChecking
        ? 'Verifying credentials... It’s can last from 5 to 60 seconds.'
        : 'We never store account credentials'
    }
    backButtonText="Select another bank"
  >
    <StepBankLogo />
    <StepTitle>Enter your credentials</StepTitle>
    <div className={classes.form}>
      {fields.map(({ label, guid: id, type }, idx) => (
        <TextField
          className={classes.field}
          autoFocus={idx === 0}
          disabled={isChecking}
          name={id}
          label={label}
          type={type === 'PASSWORD' ? 'password' : 'text'}
        />
      ))}
    </div>
    {isChecking && <Spinner className={classes.spinner} />}
  </StepLayout>
)

const createAllFieldsRequiredValidation = R.pipe(
  R.map(R.prop('guid')),
  keys => [keys, keys.map(() => [required])],
  R.apply(R.zipObj),
  createValidateFromRules
)

export default compose(
  reconnect({
    fields: credentialsFieldsSelector,
    isChecking: isCredentialsCheckingSelector,
    isError: isCredentialsErrorSelector,
  }),
  branch(R.prop('isError'), renderComponent(CredentialsFail)),
  withPropsOnChange(['fields'], ({ fields }) => ({
    validate: createAllFieldsRequiredValidation(fields),
  })),
  reduxForm({
    form: CREDENTIALS_FORM,
  }),
  injectStyles(styles)
)(Credentials)
