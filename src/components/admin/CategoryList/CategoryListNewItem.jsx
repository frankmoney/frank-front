import React from 'react'
import cx from 'classnames'
import { AddCircle as AddIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    height: 50,
    padding: [0, 15],
    borderRadius: 6,
    ...theme.fontMedium(22, 26),
    color: 'rgba(32, 40, 74, 0.4)',
    '&:hover': {
      backgroundColor: 'rgba(32, 40, 74, 0.07)',
    },
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 16,
    marginLeft: -2,
  },
})

const CategoryListNewItem = ({ classes, className, onAdd }) => (
  <div className={cx(classes.root, className)} onClick={() => onAdd()}>
    <AddIcon className={classes.icon} />Add new category
  </div>
)

export default injectStyles(styles)(CategoryListNewItem)
