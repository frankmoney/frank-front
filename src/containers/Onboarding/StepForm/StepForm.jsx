import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import { Spinner } from '@frankmoney/components'
import { required, createValidateFromRules, TextField } from '@frankmoney/forms'
import { compose, withPropsOnChange } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { STEP_FORM } from '../constants'
import StepDescription from '../StepDescription/index'
import { OptionsListItem } from '../OptionsList'
import OptionsField from './OptionsField'

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
  optionsField: {
    composes: '$field',
    display: 'block',
  },
  spinner: {
    marginTop: 70,
  },
}

const StepForm = ({ classes, fields, isChecking }) => (
  <>
    {fields.length === 1 &&
      fields[0].type === 'OPTIONS' && (
        <StepDescription>{fields[0].label}</StepDescription>
      )}
    <div className={classes.form}>
      {fields.map(
        ({ label, guid: id, type, options }, idx) =>
          type === 'OPTIONS' ? (
            <OptionsField
              className={classes.optionsField}
              name={id}
              disabled={isChecking}
            >
              {options.map(({ label: optionLabel, value }) => (
                <OptionsListItem primaryText={optionLabel} value={value} />
              ))}
            </OptionsField>
          ) : (
            <TextField
              className={classes.field}
              autoFocus={idx === 0}
              disabled={isChecking}
              name={id}
              label={label}
              type={type === 'PASSWORD' ? 'password' : 'text'}
            />
          )
      )}
    </div>
    {isChecking && <Spinner className={classes.spinner} />}
  </>
)

const createAllFieldsRequiredValidation = R.pipe(
  R.map(R.prop('guid')),
  keys => [keys, keys.map(() => [required])],
  R.apply(R.zipObj),
  createValidateFromRules
)

export default compose(
  withPropsOnChange(['fields'], ({ fields }) => ({
    validate: createAllFieldsRequiredValidation(fields),
  })),
  reduxForm({
    form: STEP_FORM,
  }),
  injectStyles(styles)
)(StepForm)
