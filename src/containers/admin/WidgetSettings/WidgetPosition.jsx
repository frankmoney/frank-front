import React from 'react'
import cx from 'classnames'
import { BrandingWatermark as IconPosition } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'

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
  icon: {
    color: 'rgba(37,43,67,0.3)',
    cursor: 'pointer',
    transition: theme.transition('color'),
    '&:hover': {
      color: 'rgba(37,43,67,1)',
    },
  },
  iconLeft: {
    composes: '$icon',
    transform: 'scale(-1, 1)',
    marginRight: 10,
  },
  iconRight: {
    composes: '$icon',
  },
  iconActive: {
    color: 'rgba(37,43,67,1)',
    pointerEvents: 'none',
  },
})

const WidgetPosition = ({ classes, className, position, onChange }) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.label}>Position</div>
    <IconPosition
      className={cx(classes.iconLeft, {
        [classes.iconActive]: position === 'left',
      })}
      onClick={() => onChange('left')}
    />
    <IconPosition
      className={cx(classes.iconRight, {
        [classes.iconActive]: position === 'right',
      })}
      onClick={() => onChange('right')}
    />
  </div>
)

export default injectStyles(styles)(WidgetPosition)
