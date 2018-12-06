// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'
import { SettingsCategoryList } from 'components/admin/CategoryList'
import CardTitle from './CardTitle'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
  title: {
    marginBottom: 38,
  },
  list: {
    marginLeft: -15,
  },
}

const CategoriesCard = ({
  classes,
  className,
  categoryType,
  categories,
  onEdit,
  onDelete,
}) => (
  <Paper type="card" className={cx(classes.root, className)}>
    <CardTitle
      className={classes.title}
      text={`${categoryType === 'spending' ? 'Spending' : 'Income'} categories`}
    />
    <SettingsCategoryList
      className={classes.list}
      categories={categories}
      onEdit={onEdit}
      onDelete={onDelete}
      onAdd={() => onEdit()}
    />
  </Paper>
)

export default injectStyles(styles)(CategoriesCard)
