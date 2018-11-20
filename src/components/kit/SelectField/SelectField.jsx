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
  disableArrowHover,
  style,
  className,
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
  noUnderline,
}) => (
  <Field
    className={className}
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
    {...getAnchorProps({ style })}
    focus={active}
    noUnderline={noUnderline}
  >
    <SelectFieldControl
      stretch
      active={active}
      disableArrowHover={disableArrowHover}
      {...getInputProps()}
    />
  </Field>
)

const SelectField = ({
  disableStretchDropdown,
  renderControl, // ignore
  stretchDropdown, // ignore
  ...otherProps
}) => (
  <Select
    renderControl={renderFieldControl}
    stretchDropdown={!disableStretchDropdown}
    {...otherProps}
  />
)

SelectField.defaultProps = {
  disableStretchDropdown: false,
}

export default SelectField
