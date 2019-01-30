// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import ListItemContext from './context'

const styles = theme => ({
  root: {
    ...theme.fontRegular(22, 30),
    color: '#20284A',
    opacity: 0.5,
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
