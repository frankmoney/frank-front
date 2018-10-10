import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    width: 410,
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    marginBottom: 10,
    // not every 3rd
    '&:not(:nth-child(3n))': {
      marginRight: 10,
    },
  },
}

const ImageOptionsList = ({
  classes,
  className,
  value,
  onChange,
  children,
}) => (
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

export default injectStyles(styles)(ImageOptionsList)
