import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import { required, createValidateFromRules } from '@frankmoney/forms'
import cx from 'classnames'
import { compose, withPropsOnChange } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import Field from 'components/Field'
import TextField from 'components/forms/TextBoxField'
import reconnect from 'utils/reconnect'
import { CREDENTIALS_FORM } from '../../constants'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
} from '../../selectors'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepBankLogo from '../../StepBankLogo'

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
}

const Credentials = ({ className, classes, fields, isChecking }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText={
      isChecking
        ? 'Verifying credentials... It’s can last from 5 to 60 seconds.'
        : 'We don’t store your credentials, we transfer it to the aggregation system.'
    }
  >
    <StepBankLogo />
    <StepTitle>Enter your credentials</StepTitle>
    <div className={classes.form}>
      {fields.map(({ label, guid: id, type }, idx) => (
        <Field title={label} stretch>
          <TextField
            className={classes.field}
            autoFocus={idx === 0}
            name={id}
            type={type === 'PASSWORD' ? 'password' : 'text'}
          />
        </Field>
      ))}
    </div>
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
  }),
  withPropsOnChange(['fields'], ({ fields }) => ({
    validate: createAllFieldsRequiredValidation(fields),
  })),
  reduxForm({
    form: CREDENTIALS_FORM,
  }),
  injectStyles(styles)
)(Credentials)
