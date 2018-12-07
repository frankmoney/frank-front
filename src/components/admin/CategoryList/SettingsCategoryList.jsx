// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import CategoryListItem from './CategoryListItem'
import CategoryListNewItem from './CategoryListNewItem'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
}

const SettingsCategoryList = ({
  classes,
  className,
  categories,
  onAdd,
  onEdit,
  onDelete,
}) => (
  <div className={cx(classes.root, className)}>
    {categories &&
      categories.map(({ id, name, color }) => (
        <CategoryListItem
          key={id}
          className={classes.item}
          id={id}
          name={name}
          color={color}
          onEdit={onEdit}
          onDelete={onDelete}
          separate
        />
      ))}
    <CategoryListNewItem onAdd={onAdd} />
  </div>
)

export default injectStyles(styles)(SettingsCategoryList)
