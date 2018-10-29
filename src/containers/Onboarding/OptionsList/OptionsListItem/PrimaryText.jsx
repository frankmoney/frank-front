import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import ListItemContext from './context'

const styles = theme => ({
  root: {
    ...theme.fontMedium(22, 30),
    color: '#20284A',
    display: 'flex',
    alignItems: 'center',
  },
  selected: {
    color: '#fff',
  },
  icon: {
    marginRight: 15,
    height: 22,
    width: 22,
  },
})

const PrimaryText = ({ classes, className, children, icon }) => (
  <ListItemContext.Consumer>
    {({ selected }) => (
      <span
        className={cx(classes.root, selected && classes.selected, className)}
      >s
        {icon &&
          React.cloneElement(icon, {
            className: cx(icon.props.className, classes.icon),
          })}
        {children}
      </span>
    )}
  </ListItemContext.Consumer>
)

export default injectStyles(styles)(PrimaryText)
