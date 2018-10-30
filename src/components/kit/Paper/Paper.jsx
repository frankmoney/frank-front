// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

type Props = {
  type: 'card' | 'list' | 'modal' | 'tooltip' | 'popup' | 'drawer',
}

const styles = {
  root: {
    background: '#fff',
    borderRadius: 8,
    overflow: 'auto',
  },
  card: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
  },
  list: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tooltip: {
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  popup: {
    boxShadow:
      '0px 5px 10px rgba(0, 0, 0, 0.15), 0px 0px 0px 1px rgba(37, 43, 67, 0.1)',
  },
  modal: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  },
  drawer: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: 0,
  },
}

const Paper = ({
  children,
  classes,
  type,
  theme,
  className,
  ...otherProps
}: Props) => (
  <div className={cx(classes.root, classes[type], className)} {...otherProps}>
    {children}
  </div>
)

Paper.defaultProps = {
  type: 'card',
}

export default injectStyles(styles)(Paper)
