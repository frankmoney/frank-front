import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    background: 'rgba(37, 43, 67, 0.5)',
    borderRadius: 3,
    color: '#fff',
    ...theme.fontMedium(10, 12),
    maxWidth: 104,
    display: 'inline-flex',
    alignItems: 'center',
    padding: [0, 4],
    height: 22,
  },
})

const TextTooltipDumb = ({
  classes,
  className,
  children,
  theme,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    {children}
  </div>
)

export default injectStyles(styles)(TextTooltipDumb)
