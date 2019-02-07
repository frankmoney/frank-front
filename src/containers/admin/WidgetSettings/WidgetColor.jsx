import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const COLOR_BORDER_PADDING = 4
const COLOR_SIZE = 24

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(37, 43, 67, 0.3)',
    ...theme.fontMedium(20, 26),
    marginRight: 14,
  },
  color: {
    cursor: 'pointer',
    padding: COLOR_BORDER_PADDING,
    borderRadius: '50%',
    width: COLOR_SIZE,
    height: COLOR_SIZE,
    position: 'relative',
    border: '1px solid transparent',
    '&:not(:last-child)': {
      marginRight: 4,
    },
    '&:after': {
      position: 'absolute',
      content: '""',
      left: COLOR_BORDER_PADDING - 1,
      top: COLOR_BORDER_PADDING - 1,
      width: COLOR_SIZE - COLOR_BORDER_PADDING * 2,
      height: COLOR_SIZE - COLOR_BORDER_PADDING * 2,
      borderRadius: '50%',
    },
  },
  colorDark: {
    composes: '$color',
    '&:after': {
      background: '#252B43',
    },
  },
  colorBlue: {
    composes: '$color',
    '&:after': {
      background: '#4C51F3',
    },
  },
  colorActive: {
    pointerEvents: 'none',
    borderColor: 'rgba(37, 43, 67, 0.3)',
  },
})

const WidgetColor = ({ classes, className, color, onChange }) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.label}>Color</div>
    <div
      className={cx(classes.colorDark, {
        [classes.colorActive]: color === 'dark',
      })}
      onClick={() => onChange('dark')}
    />
    <div
      className={cx(classes.colorBlue, {
        [classes.colorActive]: color === 'blue',
      })}
      onClick={() => onChange('blue')}
    />
  </div>
)

export default injectStyles(styles)(WidgetColor)
