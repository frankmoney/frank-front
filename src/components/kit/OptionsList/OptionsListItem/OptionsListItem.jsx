import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import PrimaryText from './PrimaryText'
import Context from './context'

const styles = theme => ({
  root: {
    display: 'block', // override if root component set to 'a' for example
    borderRadius: 8,
    padding: [12, 15],
    background: 'rgba(32, 40, 74, 0.04)',
    transition: theme.transition('background-color'),
    cursor: 'pointer',
    color: '#20284A',
    textDecoration: 'none',
    '&:not($selected):active': {
      background: 'rgba(32, 40, 74, 0.15)',
    },
  },
  pressed: {
    background: 'red',
  },
  selected: {
    background: '#20284A',
    boxShadow: '0px 2px 10px rgba(47, 60, 113, 0.25)',
  },
  active: {
    '&:not($selected)': {
      background: 'rgba(32, 40, 74, 0.1)',
    },
  },
})

const OptionsListItem = ({
  classes,
  theme,
  value,
  className,
  component: Root = 'div',
  selected,
  active,
  children,
  primaryText,
  primaryTextIcon,
  ...otherProps
}) => (
  <Context.Provider value={{ selected }}>
    <Root
      className={cx(
        classes.root,
        selected && classes.selected,
        active && classes.active,
        className
      )}
      {...otherProps}
    >
      {primaryText && (
        <PrimaryText icon={primaryTextIcon}>{primaryText}</PrimaryText>
      )}
      {children}
    </Root>
  </Context.Provider>
)

export default injectStyles(styles)(OptionsListItem)
