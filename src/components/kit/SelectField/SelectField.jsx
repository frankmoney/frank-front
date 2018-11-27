// @flow strict-local
import React from 'react'
import Select from 'components/kit/Select'
import Field from 'components/kit/fields/Field'
import SelectFieldControl from './SelectFieldControl'

const renderFieldControl = (
  { valueFormatted, active, place, getInputProps, getAnchorProps },
  { stretch, disableArrowHover, ...otherProps }
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
      arrowUp={place === 'up'}
      {...getInputProps()}
    />
  </Field>
)

// TODO merge with FieldProps
type Props = {
  disableStretchDropdown: boolean,
}

const SelectField = ({
  disableStretchDropdown,
  renderControl, // ignore
  stretchDropdown, // ignore
  ...otherProps
}: Props) => (
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
