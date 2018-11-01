// @flow
import React from 'react'
import * as R from 'ramda'
import DropdownSwitcher from 'components/DropdownSwitcher'

export type CategoryTypeSelectCb = string => void

type Props = {|
  className?: string,
  label: string,
  onChange: CategoryTypeSelectCb,
  value: string,
  values: Array<string>,
|}

const CategoryTypeSelect = ({
  className,
  label,
  onChange,
  value,
  values,
}: Props) => {
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

CategoryTypeSelect.defaultProps = {
  label: '% of total',
  values: ['income', 'spending'],
}

export default CategoryTypeSelect
