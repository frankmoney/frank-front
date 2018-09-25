import React from 'react'
import cx from 'classnames'
import { Edit as EditIcon, Delete as RemoveIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import Color from 'color-js'
import CategoryLabel from 'components/CategoryLabel'

const styles = theme => ({
  root: {
    padding: [0, 20],
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: theme.transition('background-color'),
    '&:hover': {
      backgroundColor: props => Color(props.color).setAlpha(0.04),
    },
    '&:hover > $toolbar': {
      visibility: 'visible',
    },
  },
  label: {
    ...theme.fontMedium(20, 26),
  },
  toolbar: {
    visibility: 'collapse',
  },
  toolbarButton: {
    marginLeft: 10,
    width: 22,
    cursor: 'pointer',
    opacity: 0.5,
    transition: theme.transition('opacity'),
    '&:hover': {
      opacity: 1,
    },
  },
})

const CategoriesListItem = ({
  classes,
  className,
  id,
  name,
  color,
  onEdit,
  onDelete,
}) => (
  <div className={cx(classes.root, className)}>
    <CategoryLabel
      className={classes.label}
      id={id}
      name={name}
      color={color}
    />
    <div className={classes.toolbar} style={{ color }}>
      <EditIcon className={classes.toolbarButton} onClick={() => onEdit(id)} />
      <RemoveIcon
        className={classes.toolbarButton}
        onClick={() => onDelete(id)}
      />
    </div>
  </div>
)

export default injectStyles(styles)(CategoriesListItem)
