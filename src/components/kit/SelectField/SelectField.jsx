// @flow
import React from 'react'
import { withProps } from 'recompose'
import Select from 'components/kit/Select'
import Field from 'components/kit/fields/Field'
import SelectFieldControl from './SelectFieldControl'

// TODO merge with FieldProps
type Props = {}

const renderFieldControl = ({
  valueFormatted,
  getAnchorProps,
  active,
  getInputProps,
  // FIELD PROPS
  placeholder,
  larger,
  error,
  hint,
  label,
  floatingLabel,
  additionalLabel,
  focus,
  disabled,
  loading,
  loadingText,
}) => (
  <Field
    placeholder={placeholder}
    larger={larger}
    error={error}
    hint={hint}
    label={label}
    floatingLabel={floatingLabel}
    additionalLabel={additionalLabel}
    disabled={disabled}
    loading={loading}
    loadingText={loadingText}
    value={valueFormatted}
    {...getAnchorProps()}
    focus={active}
  >
    <SelectFieldControl
      stretch
      active={active}
      {...getInputProps()}
    />
  </Field>
)

const SelectField = withProps({
  renderControl: renderFieldControl,
  stretchDropdown: true,
})(Select)

export default SelectField
