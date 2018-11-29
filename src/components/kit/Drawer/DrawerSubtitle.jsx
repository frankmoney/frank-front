import * as React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    color: 'rgba(37,43,67,0.7)',
    ...theme.fontRegular(18, 26),
    marginTop: -10,
    paddingBottom: 27,
  },
})

const DrawerSubtitle = ({ classes, className, children, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    {children}
  </div>
)

export default injectStyles(styles)(DrawerSubtitle)
