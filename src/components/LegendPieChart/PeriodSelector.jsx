import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import DropdownSwitcher from 'components/DropdownSwitcher'

const PeriodSelector = ({ className, onChange, value, values }) => {
  const handlePeriodChange = onChange && (event => onChange(event.target.value))
  const keyedValues = R.map(R.objOf('key'))(values)
  return (
    <DropdownSwitcher
      className={className}
      onChange={handlePeriodChange}
      value={value}
      values={keyedValues}
    />
  )
}

PeriodSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PeriodSelector
