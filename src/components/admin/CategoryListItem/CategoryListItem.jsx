import React from 'react'
import cx from 'classnames'
import { Edit as EditIcon, Delete as RemoveIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import Color from 'color-js'
import CategoryLabel from 'components/CategoryLabel'

const styles = theme => ({
  root: {
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
  inline: {
    padding: [0, 20],
    height: 60,
  },
  separate: {
    height: 50,
    padding: [0, 15],
    borderRadius: 6,
    display: 'inline-flex',
  },
  label: {
    ...theme.fontMedium(20, 26),
  },
  toolbar: {
    visibility: 'collapse',
    '$separate &': {
      marginLeft: 40,
    },
  },
  toolbarButton: {
    width: 22,
    cursor: 'pointer',
    opacity: 0.5,
    transition: theme.transition('opacity'),
    '&:hover': {
      opacity: 1,
    },
    '&:not(:last-child)': {
      marginRight: 10,
    },
  },
  indicator: {
    width: 14,
    height: 14,
  },
})

const CategoryListItem = ({
  classes,
  className,
  id,
  name,
  color,
  onEdit,
  onDelete,
  inline,
  separate,
}) => (
  <div
    className={cx(
      classes.root,
      {
        [classes.inline]: inline,
        [classes.separate]: separate,
      },
      className
    )}
  >
    <CategoryLabel
      className={classes.label}
      iconClassName={classes.indicator}
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

export default injectStyles(styles)(CategoryListItem)
