// @flow
import React from 'react'
import { withProps } from 'recompose'
import Select from 'components/kit/Select'
import Field from 'components/kit/fields/Field'
import SelectFieldControl from './SelectFieldControl'

// TODO merge with FieldProps
type Props = {}

const renderFieldControl = (
  { valueFormatted, active, getInputProps, getAnchorProps },
  { style, stretch, disableArrowHover, ...otherProps }
) => (
  <Field
    {...getAnchorProps(otherProps)}
    value={valueFormatted}
    stretch={stretch}
    focus={active}
  >
    <SelectFieldControl
      stretch={stretch}
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
