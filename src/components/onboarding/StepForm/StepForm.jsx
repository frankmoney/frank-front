import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import { required, createValidateFromRules } from '@frankmoney/forms'
import { compose, withPropsOnChange, lifecycle } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import TextField from 'components/kit/TextField'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import StepDescription from 'components/onboarding/StepDescription'
import { OptionsListItem } from 'components/onboarding/OptionsList'
import { ImageListItem } from 'components/onboarding/ImageOptionsList'
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
  },
  fieldImageWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },
  fieldImage: {},
  optionsField: {
    marginTop: 30,
    width: 370,
    display: 'block',
  },
  imageOptionsField: {},
  spinner: {
    marginTop: 70,
  },
}

const renderField = ({
  classes,
  disabled,
  label,
  guid: id,
  type,
  imageData,
  imageOptions,
  options,
  onSubmit,
  idx,
}) => {
  const handleTextFieldKeyPress = event => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  if (type === 'OPTIONS') {
    return (
      <OptionsField
        className={classes.optionsField}
        name={id}
        disabled={disabled}
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
        disabled={disabled}
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
      <ReduxFormControl.Field
        stretch
        floatingLabel={label}
        className={classes.field}
        component={TextField}
        name={id}
        disableAutoComplete
        type={type === 'PASSWORD' ? 'password' : 'text'}
        autoFocus={idx === 0}
        disabled={disabled}
        onKeyPress={handleTextFieldKeyPress}
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

const StepForm = ({ classes, fields, submit, disabled }) => (
  <>
    {renderMainLabel(fields)}
    <div className={classes.form}>
      {fields.map((field, idx) =>
        renderField({ ...field, classes, onSubmit: submit, disabled, idx })
      )}
    </div>
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
  reduxForm({}),
  lifecycle({
    componentWillReceiveProps(props) {
      if (this.props.fields[0].guid !== props.fields[0].guid) {
        this.props.reset()
      }
    },
  }),
  injectStyles(styles)
)(StepForm)
