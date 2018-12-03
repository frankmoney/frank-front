// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import CategoryMenuItem from 'components/CategoryMenuItem'
import SelectField from 'components/kit/SelectField'
import type { Category } from 'data/models/category'
import CategorySelectValue from './CategorySelectValue'

type Props = {|
  categories: Array<Category>,
  placeholder: string,
|}

const findById = (list, id) => R.find(R.propEq('id', id), list)

const CategorySelect = ({
  categories,
  value,
  placeholder,
  menuProps,
  ...otherProps
}: Props) => {
  const formatValue = id => {
    const item = findById(categories, id)
    const placeholderItem = {
      name: placeholder,
      color: 'rgba(37, 43, 67, 0.2)',
    }
    return <CategorySelectValue {...item || placeholderItem} />
  }

  return (
    <SelectField
      value={value}
      formatValue={formatValue}
      disableArrowHover
      disableStretchDropdown
      noUnderline
      distance={-4}
      menuProps={{
        maxVisibleItems: 5,
        ...menuProps,
      }}
      {...otherProps}
    >
      {categories.map(({ id, name, color }) => (
        <CategoryMenuItem key={id} value={id} color={color} label={name} />
      ))}
    </SelectField>
  )
}

CategorySelect.defaultProps = {
  placeholder: '',
}

export default CategorySelect
