import React from 'react'
import { Field } from 'redux-form-actions/immutable'
import { compose, mapProps } from 'recompose'
import { fromJS } from 'immutable'

export default UploaderComponent => {
  const MappedUploader = compose(
    mapProps(
      ({ input: { value, ...inputProps }, meta, httpClient, ...custom }) => ({
        ...inputProps,
        files: value,
        ...custom,
      })
    )
  )(UploaderComponent)

  const toImmutable = value => fromJS(value)
  const fromImmutable = value => value && value.toJS()

  const FormUploaderField = ({ ...props }) => (
    <Field
      component={MappedUploader}
      parse={toImmutable}
      format={fromImmutable}
      {...props}
    />
  )

  return FormUploaderField
}
