import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    position: 'relative',
    height: 52,
    padding: [0, 10],
    color: 'rgba(37, 43, 67, 0.3)',
    ...theme.fontMedium(20, 26),
    userSelect: 'none',
    cursor: 'pointer',
    transition: theme.transition('color'),
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 8,
      right: 8,
      height: 1,
      background: '#252B43',
      opacity: 0,
    },
  },
  active: {
    cursor: 'initial',
    color: '#252B43',
    '&:after': {
      transition: theme.transition('opacity'),
      opacity: 1,
    },
  },
})

const TabsItem = ({ classes, className, label, active, value, ...props }) => (
  <div
    className={cx(classes.root, { [classes.active]: active }, className)}
    {...props}
  >
    {label}
  </div>
)

export default injectStyles(styles)(TabsItem)
