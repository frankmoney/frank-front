import React from 'react'
import cx from 'classnames'
import { CheckedMenuItem } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel from 'components/CategoryLabel'
import SelectField from 'components/SelectField'

const styles = {
  root: {},
  categoryIcon: {
    height: 16,
    width: 16,
  },
}

const CategorySelect = ({
  theme,
  classes,
  className,
  itemClassName,
  categoryIconClassName,
  categories,
  value,
  ...otherProps
}) => {
  const iconClassName = cx(classes.categoryIcon, categoryIconClassName)

  return (
    <SelectField
      className={cx(classes.root, className)}
      value={value}
      {...otherProps}
    >
      <CheckedMenuItem value="-">
        <CategoryLabel
          iconClassName={iconClassName}
          name="Uncategorized"
          color="rgb(211, 213, 217)"
        />
      </CheckedMenuItem>
      {categories.map(({ id, name, color }) => (
        <CheckedMenuItem key={id} value={id}>
          <CategoryLabel
            iconClassName={iconClassName}
            color={color}
            name={name}
          />
        </CheckedMenuItem>
      ))}
    </SelectField>
  )
}

export default injectStyles(styles)(CategorySelect)
