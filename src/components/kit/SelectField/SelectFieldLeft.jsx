// @flow
import React from 'react'
import { withProps } from 'recompose'
import Select from 'components/kit/Select'
import LeftField from 'components/kit/fields/LeftField'
import SelectFieldControl from 'components/kit/SelectField/SelectFieldControl'

const renderFieldControl = ({
  valueFormatted,
  getAnchorProps,
  active,
  getInputProps,
  // FIELD PROPS
  placeholder,
  label,
  focus,
  disabled,
  className,
}) => (
  <LeftField
    placeholder={placeholder}
    label={label}
    disabled={disabled}
    value={valueFormatted}
    stretch
    focus={active}
    className={className}
  >
    <SelectFieldControl
      stretch
      active={active}
      {...getInputProps(getAnchorProps())}
    />
  </LeftField>
)

const SelectField = withProps({
  renderControl: renderFieldControl,
})(Select)

export default SelectField
