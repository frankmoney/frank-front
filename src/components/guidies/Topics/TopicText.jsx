import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    color: '#252B43',
    ...theme.fontRegular(20, 26),
  },
  icon: {
    marginRight: 30,
    height: 100,
    width: 100,
  },
})

const TopicText = ({ classes, className, children }) => (
  <div className={cx(classes.root, className)}>{children}</div>
)

export default injectStyles(styles)(TopicText)
