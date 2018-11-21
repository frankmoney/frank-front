// import React from 'react'
import { Field } from 'redux-form-actions/immutable'
import { compose, mapProps, withPropsOnChange } from 'recompose'
import { countUnits } from '@frankmoney/utils'

const hasValue = value => {
  if (value && typeof value.length !== 'undefined') {
    return value.length > 0
  }

  return !!value
}

const mapHelperText = ({
  counter,
  input: { value },
  meta: { error, active, submitFailed },
}) =>
  // Не хотим подсвечивать поля ошибкой если его оставили пустым (прячем required проверку)
  // Смотреть задачу: https://app.asana.com/0/410005071738676/422174601249387
  ((submitFailed || value.length > 0) && error) ||
  // show counter only when input is focused, otherwise show helperText
  (active && counter ? countUnits(value, counter) : undefined)

const mapError = ({ input: { value }, meta: { error, submitFailed } }) =>
  (submitFailed || hasValue(value)) && !!error

const propsMapper = mapProps(props => {
  const {
    input: { value, onChange, onFocus, onBlur },
    meta: { active },
    counter,
    ...otherProps
  } = props

  return {
    value,
    onChange,
    onFocus,
    onBlur,
    focus: active,
    error: mapError(props),
    hint: mapHelperText(props),
    ...otherProps,
  }
})

const ReduxFormField = compose(
  withPropsOnChange(['component'], ({ component: Component }) => ({
    component: propsMapper(Component),
  }))
)(Field)

export default ReduxFormField
