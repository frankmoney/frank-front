import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import DropdownSwitcher from 'components/DropdownSwitcher'

const CategoryTypeSelect = ({ className, label, onChange, value, values }) => {
  const handleChange = onChange && (event => onChange(event.target.value))
  const keyedValues = R.map(R.objOf('key'))(values)
  return (
    <DropdownSwitcher
      className={className}
      label={label}
      onChange={handleChange}
      value={value}
      values={keyedValues}
    />
  )
}

CategoryTypeSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
}

CategoryTypeSelect.defaultProps = {
  label: '% of total',
  values: ['income', 'spending'],
}

export default CategoryTypeSelect
