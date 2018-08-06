import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { CheckedMenuList, HeaderFilter } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel from 'components/CategoryLabel'
import colors from 'styles/colors'
import CategorySelectItem from './CategorySelectItem'

const styles = {
  root: {},
  categoryIcon: {
    height: 16,
    width: 16,
  },
}

const items = [
  {
    value: 'uncategorized',
    name: 'Uncategorized',
    color: 'rgba(37, 43, 67, 0.2)',
  },
  { value: 'marketing', name: 'Marketing', color: colors.purple },
]

const CategorySelect = ({
  categoryIconClassName,
  classes,
  value,
  ...otherProps
}) => {
  const item = R.find(R.propEq('value', value), items) || items[0]

  const iconClassName = cx(classes.categoryIcon, categoryIconClassName)

  const selection = (
    <CategoryLabel
      iconClassName={iconClassName}
      color={item.color}
      name={item.name}
    />
  )

  return (
    <HeaderFilter selectedValue={selection} {...otherProps}>
      <CheckedMenuList className={classes.root}>
        {items.map(({ value: itemValue, name, color }) => (
          <CategorySelectItem
            key={itemValue}
            value={itemValue}
            iconClassName={iconClassName}
            name={name}
            color={color}
            selected={value === itemValue}
          />
        ))}
      </CheckedMenuList>
    </HeaderFilter>
  )
}

export default injectStyles(styles)(CategorySelect)
