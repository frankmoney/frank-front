import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { CheckedMenuItem } from '@frankmoney/components'
import Color from 'color-js'

const getColor = props =>
  Color(props.color)
    .setAlpha(0.06)
    .toString()

const styles = theme => ({
  root: {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    '&:hover': {
      backgroundColor: getColor,
    },
    '&:focus': {
      backgroundColor: getColor,
    },
  },
  itemWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  indicator: {
    borderRadius: '50%',
    width: 14,
    height: 14,
    marginRight: 15,
    backgroundColor: props => props.color,
  },
  label: {
    ...theme.fontMedium(18, 26),
    color: props => props.color,
  },
  rightIconColor: {
    color: props => props.color,
  },
})

const ColorMenuItem = ({ classes, className, color, name, ...otherProps }) => (
  <CheckedMenuItem
    rightIconClassName={classes.rightIconColor}
    className={cx(classes.root, className)}
    value={color}
    {...otherProps}
  >
    <div className={classes.itemWrap}>
      <div className={classes.indicator} />
      <div className={classes.label}>{name}</div>
    </div>
  </CheckedMenuItem>
)

export default compose(injectStyles(styles))(ColorMenuItem)
