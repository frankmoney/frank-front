// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import CategoryMenuItem from 'components/CategoryMenuItem'
import SelectField from 'components/kit/SelectField'
import CategorySelectValue from './CategorySelectValue'

type Category = {|
  id: string,
  name: string,
  color: string,
|}

type Props = {|
  categories: Array<Category>,
|}

const findById = (list, id) => R.find(R.propEq('id', id), list)

const CategorySelect = ({
  categories,
  value,
  menuProps,
  ...otherProps
}: Props) => {
  const formatValue = id => {
    const item = findById(categories, id)

    return item && <CategorySelectValue {...item} />
  }

  return (
    <SelectField
      placeholder="Choose category"
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

export default CategorySelect
