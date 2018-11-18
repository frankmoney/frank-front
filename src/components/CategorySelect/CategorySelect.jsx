import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { UNCATEGORIZED_COLOR } from 'const'
import CategoryMenuItem from 'components/CategoryMenuItem'
import SelectField from 'components/kit/SelectField'
import CategoryLabel from '../CategoryLabel/CategoryLabel'

const styles = {
  root: {},
  categoryName: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
}

const CategorySelect = ({
  theme,
  classes,
  className,
  categories,
  value,
  ...otherProps
}) => {
  const formatValue = id => {
    const category = R.find(R.propEq('id', id), categories)
    return <CategoryLabel nameClassName={classes.categoryName} {...category} />
  }

  return (
    <SelectField
      className={cx(classes.root, className)}
      placeholder="Choose category"
      value={value}
      formatValue={formatValue}
      {...otherProps}
    >
      <>
        <CategoryMenuItem
          key={'-'}
          value={'-'}
          color={UNCATEGORIZED_COLOR}
          label="Uncategorized"
        />
        {categories.map(({ id, name, color }) => (
          <CategoryMenuItem key={id} value={id} color={color} label={name} />
        ))}
      </>
    </SelectField>
  )
}

export default injectStyles(styles)(CategorySelect)
