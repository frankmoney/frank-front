import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    padding: [15, 30],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    background: '#fff',
  },
  text: {
    flex: '1 1 auto',
    fontSize: 16,
    lineHeight: 26,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
  },
  buttons: {
    flexShrink: 0,
    '& > *:not(:first-child)': {
      marginLeft: 10,
    },
  },
  textSmaller: {
    composes: '$text',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(37, 43, 67, .5)',
    fontWeight: 400,
  },
}

const Footer = ({
  classes,
  className,
  text,
  textSmaller,
  children,
  ...otherProps
}) => (
  <div className={cx(className, classes.root)} {...otherProps}>
    <div className={textSmaller ? classes.textSmaller : classes.text}>
      {text}
    </div>
    <div className={classes.buttons}>{children}</div>
  </div>
)

export default injectStyles(styles)(Footer)
