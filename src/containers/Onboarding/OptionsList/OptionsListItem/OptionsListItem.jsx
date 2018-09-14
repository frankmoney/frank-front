import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import PrimaryText from './PrimaryText'
import Context from './context'

const styles = theme => ({
  root: {
    borderRadius: 8,
    padding: [12, 15],
    background: 'rgba(32, 40, 74, 0.04)',
    transition: theme.transition('background-color'),
    cursor: 'pointer',
    '&:hover:not($selected)': {
      background: 'rgba(32, 40, 74, 0.1)',
    },
  },
  selected: {
    cursor: 'unset',
    background: '#20284A',
    boxShadow: '0px 2px 10px rgba(47, 60, 113, 0.25)',
  },
})

const OptionsListItem = ({
  classes,
  selected,
  className,
  children,
  primaryText,
  onClick,
}) => (
  <div
    className={cx(classes.root, selected && classes.selected, className)}
    onClick={onClick}
  >
    <Context.Provider value={{ selected }}>
      {primaryText && <PrimaryText>{primaryText}</PrimaryText>}
      {children}
    </Context.Provider>
  </div>
)

export default injectStyles(styles)(OptionsListItem)
