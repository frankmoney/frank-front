import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryListItem from './CategoryListItem'

const styles = theme => ({
  root: {
    paddingTop: 20,
    paddingBottom: 5,
    borderRadius: 8,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
    width: 360,
  },
  titleWrap: {
    display: 'flex',
    height: 20,
    padding: [0, 20],
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    ...theme.fontMedium(20, 20),
    color: '#252B43',
  },
  deleteAll: {
    ...theme.fontRegular(20, 20),
    color: 'rgba(37, 43, 67, 0.3)',
    cursor: 'pointer',
    transition: theme.transition('color'),
    '&:hover': {
      color: 'rgba(37, 43, 67, 0.8)',
    },
  },
})

const CategoriesList = ({
  classes,
  className,
  categories,
  onDeleteAll,
  onEdit,
  onDelete,
  title,
}) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.titleWrap}>
      <div className={classes.title}>{title}</div>
      <div className={classes.deleteAll} onClick={onDeleteAll}>
        Delete All
      </div>
    </div>

    {categories.map(({ id, name, color }) => (
      <CategoryListItem
        key={id}
        className={classes.item}
        id={id}
        name={name}
        color={color}
        onEdit={onEdit}
        onDelete={onDelete}
        inline
      />
    ))}
  </div>
)

export default injectStyles(styles)(CategoriesList)
