// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    width: 370,
  },
  item: {
    marginBottom: 10,
  },
}

const OptionsList = ({ classes, className, value, onChange, children }) => (
  <div className={cx(classes.root, className)}>
    {React.Children.map(children, element =>
      React.cloneElement(element, {
        className: cx(element.props.className, classes.item),
        selected: value
          ? value === element.props.value
          : element.props.selected,
        onClick:
          onChange && element.props.value
            ? (...args) => {
                onChange(element.props.value)
                if (typeof element.props.onClick === 'function') {
                  element.props.onClick(...args)
                }
              }
            : element.props.onClick,
      })
    )}
  </div>
)

export default injectStyles(styles)(OptionsList)
