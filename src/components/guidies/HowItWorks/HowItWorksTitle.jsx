import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    color: '#252B43',
    ...theme.fontMedium(90),
    display: 'flex',
    alignItems: 'center',
    marginBottom: 36,
  },
  icon: {
    marginRight: 30,
    height: 100,
    width: 100,
  },
})

const HowItWorksTitle = ({ classes, className, children, icon }) => (
  <div className={cx(classes.root, className)}>
    {icon && React.cloneElement(icon, { className: classes.icon })}
    <div className={classes.text}>{children}</div>
  </div>
)

export default injectStyles(styles)(HowItWorksTitle)
