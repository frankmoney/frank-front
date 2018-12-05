// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { AddCircle as AddIcon } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'
import Item from 'components/admin/CategoryListItem'
import CardTitle from './CardTitle'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
  title: {
    marginBottom: 38,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginLeft: -15,
  },
  addItem: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    height: 50,
    padding: [0, 15],
    borderRadius: 6,
    ...theme.fontMedium(20, 26),
    color: 'rgba(32, 40, 74, 0.4)',
    '&:hover': {
      backgroundColor: 'rgba(32, 40, 74, 0.07)',
    },
  },
  addIcon: {
    height: 17,
    width: 17,
    marginRight: 8,
    marginLeft: -1,
  },
})

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
    <div className={classes.list}>
      {categories &&
        categories.map(({ id, name, color }) => (
          <Item
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
      <div className={classes.addItem} onClick={() => onEdit()}>
        <AddIcon className={classes.addIcon} />Add new category
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(CategoriesCard)
