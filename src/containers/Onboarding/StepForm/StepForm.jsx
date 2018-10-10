import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import { Spinner } from '@frankmoney/components'
import { required, createValidateFromRules, TextField } from '@frankmoney/forms'
import { compose, withPropsOnChange, lifecycle } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { STEP_FORM } from '../constants'
import StepDescription from '../StepDescription/index'
import { OptionsListItem } from '../OptionsList'
import { ImageListItem } from '../ImageOptionsList'
import OptionsField from './OptionsField'
import ImageOptionsField from './ImageOptionsField'

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
  fieldImageWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },
  fieldImage: {},
  optionsField: {
    composes: '$field',
    display: 'block',
  },
  imageOptionsField: {},
  spinner: {
    marginTop: 70,
  },
}

const renderField = ({
  classes,
  isChecking,
  label,
  guid: id,
  type,
  imageData,
  imageOptions,
  options,
  idx,
}) => {
  if (type === 'OPTIONS') {
    return (
      <OptionsField
        className={classes.optionsField}
        name={id}
        disabled={isChecking}
      >
        {options.map(({ label: optionLabel, value }) => (
          <OptionsListItem primaryText={optionLabel} value={value} />
        ))}
      </OptionsField>
    )
  } else if (type === 'IMAGE_OPTIONS') {
    return (
      <ImageOptionsField
        name={id}
        className={classes.imageOptionsField}
        disabled={isChecking}
      >
        {imageOptions.map(({ value, dataUri }) => (
          <ImageListItem value={value} src={dataUri} />
        ))}
      </ImageOptionsField>
    )
  }
  return (
    <>
      {imageData && (
        <div className={classes.fieldImageWrap}>
          <img className={classes.fieldImage} src={imageData} alt="mfa_image" />
        </div>
      )}
      <TextField
        className={classes.field}
        autoFocus={idx === 0}
        disabled={isChecking}
        name={id}
        label={label}
        type={type === 'PASSWORD' ? 'password' : 'text'}
      />
    </>
  )
}

const renderMainLabel = fields => {
  if (fields.length === 1) {
    const type = fields[0].type
    if (['OPTIONS', 'IMAGE_OPTIONS'].includes(type)) {
      return <StepDescription>{fields[0].label}</StepDescription>
    }
  }
  return null
}

const StepForm = ({ classes, fields, isChecking }) => (
  <>
    {renderMainLabel(fields)}
    <div className={classes.form}>
      {fields.map((field, idx) =>
        renderField({ ...field, classes, isChecking, idx })
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
  lifecycle({
    componentWillReceiveProps(props) {
      if (this.props.fields[0].guid !== props.fields[0].guid) {
        this.props.reset()
      }
    },
  }),
  injectStyles(styles)
)(StepForm)
