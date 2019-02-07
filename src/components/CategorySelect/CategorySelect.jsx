// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import CategoryMenuItem from 'components/CategoryMenuItem'
import { MenuItemSeparator } from 'components/kit/Menu'
import SelectField from 'components/kit/SelectField'
import type { Category } from 'data/models/category'
import CategorySelectValue from './CategorySelectValue'

type Props = {|
  categories: Array<Category>,
  // separate by category type using Menu separator component
  typeSeparated?: boolean,
  placeholder: string,
|}

const findById = (list, id) => R.find(R.propEq('id', id), list)

const renderCategoryItem = ({ id, name, color }) => (
  <CategoryMenuItem key={id} value={id} color={color} label={name} />
)

const renderSeparatedCategories = R.pipe(
  // put spending first
  R.sortBy(R.ifElse(R.propEq('type', 'spending'), R.always(0), R.always(1))),
  R.groupBy(R.prop('type')),
  R.values,
  R.map(R.map(renderCategoryItem)),
  R.intersperse(<MenuItemSeparator />)
)

const CategorySelect = ({
  categories,
  value,
  placeholder,
  typeSeparated,
  menuProps,
  ...otherProps
}: Props) => {
  const formatValue = id => {
    const item = findById(categories, id)

    return item ? <CategorySelectValue {...item} /> : null
  }

  const renderPlaceholder = () => (
    <CategorySelectValue name={placeholder} color="rgba(37, 43, 67, 0.2)" />
  )

  return (
    <SelectField
      value={value}
      formatValue={formatValue}
      renderPlaceholder={renderPlaceholder}
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
      {typeSeparated
        ? renderSeparatedCategories(categories)
        : categories.map(renderCategoryItem)}
    </SelectField>
  )
}

CategorySelect.defaultProps = {
  placeholder: '',
}

export default CategorySelect
