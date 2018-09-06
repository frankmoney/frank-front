import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    width: 370,
  },
  item: {
    marginBottom: 10,
  },
}

const OptionsList = ({ classes, className, children }) => (
  <div className={cx(classes.root, className)}>
    {React.Children.map(children, element =>
      React.cloneElement(element, {
        className: cx(element.props.className, classes.item),
      })
    )}
  </div>
)

export default injectStyles(styles)(OptionsList)
