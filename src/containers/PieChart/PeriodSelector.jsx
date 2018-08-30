import React from 'react'
import PropTypes from 'prop-types'
import DropdownSwitcher from 'components/DropdownSwitcher'

export const PERIODS = [{ key: 'All time' }, { key: '2018' }, { key: 'TBD' }]

const PeriodSelector = ({ className, onChange, value, values }) => (
  <DropdownSwitcher
    className={className}
    onChange={onChange}
    value={value}
    values={values}
  />
)

PeriodSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired })
  ).isRequired,
}

PeriodSelector.defaultProps = {
  values: PERIODS,
}

export default PeriodSelector
