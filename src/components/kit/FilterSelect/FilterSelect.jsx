import React from 'react'
import { withProps } from 'recompose'
import Select from 'components/kit/Select'
import SelectValue from 'components/kit/FilterSelect/FilterSelectValue'

const renderControl = ({
  getInputProps,
  getAnchorProps,
  valueFormatted,
  active,
}) => (
  <SelectValue
    {...getAnchorProps(getInputProps())}
    value={valueFormatted}
    active={active}
  />
)

const formatValue = value => `By ${value}`

const FilterSelect = withProps({ renderControl, formatValue, align: 'end' })(
  Select
)

export default FilterSelect
