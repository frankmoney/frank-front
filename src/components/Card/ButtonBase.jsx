import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    display: 'inline-block',
    marginLeft: 10,
  },
  button: {
    height: 50,
    padding: [0, 20],
    borderRadius: 5,
    color: '#000',
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'rgba(37, 43, 67, 0.04)',
      boxShadow: 'none',
    },
  },
  icon: {
    marginRight: 15,
    verticalAlign: 'bottom',
  },
}

const ButtonBase = ({
  classes,
  className,
  buttonClassName,
  iconClassName,
  icon: Icon,
  children,
}) => (
  <div className={cx(className, classes.root)}>
    <Button className={cx(buttonClassName, classes.button)} type="primary">
      {Icon && <Icon className={cx(iconClassName, classes.icon)} />}
      {children}
    </Button>
  </div>
)

export default injectStyles(styles)(ButtonBase)
