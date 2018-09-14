import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import Field from 'components/Field'
import TextField from 'components/forms/TextBoxField'
import reconnect from 'utils/reconnect'
import { CREDENTIALS_FORM } from '../../constants'
import { credentialsFieldsSelector } from '../../selectors'
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

const Credentials = ({ className, classes, fields }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText="We don’t store your credentials, we transfer it to the aggregation system."
  >
    <StepBankLogo />
    <StepTitle>Enter your credentials</StepTitle>
    <div className={classes.form}>
      {fields.map(({ label, id, type }, idx) => (
        <Field title={label}>
          <TextField
            autoFocus={idx === 0}
            className={classes.field}
            name={id}
            type={type === 'PASSWORD' ? 'password' : 'text'}
          />
        </Field>
      ))}
    </div>
  </StepLayout>
)

const validateAllRequired = R.pipe(
  R.values,
  R.all(x => !!x)
)

export default compose(
  reconnect({
    fields: credentialsFieldsSelector,
  }),
  reduxForm({
    name: CREDENTIALS_FORM,
    validate: validateAllRequired,
  }),
  injectStyles(styles)
)(Credentials)
