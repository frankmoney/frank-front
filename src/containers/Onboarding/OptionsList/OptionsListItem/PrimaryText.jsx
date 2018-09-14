import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import ListItemContext from './context'

const styles = theme => ({
  root: {
    ...theme.fontMedium(22, 30),
    color: '#20284A',
  },
  selected: {
    color: '#fff',
  },
})

const PrimaryText = ({ classes, className, children }) => (
  <ListItemContext.Consumer>
    {({ selected }) => (
      <span
        className={cx(classes.root, selected && classes.selected, className)}
      >
        {children}
      </span>
    )}
  </ListItemContext.Consumer>
)

export default injectStyles(styles)(PrimaryText)
