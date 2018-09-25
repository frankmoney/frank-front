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
  component: Root = 'div',
  selected,
  className,
  children,
  primaryText,
  onClick,
  primaryTextIcon,
  ...otherProps
}) => (
  <Root
    className={cx(classes.root, selected && classes.selected, className)}
    onClick={onClick}
    {...otherProps}
  >
    <Context.Provider value={{ selected }}>
      {primaryText && (
        <PrimaryText icon={primaryTextIcon}>{primaryText}</PrimaryText>
      )}
      {children}
    </Context.Provider>
  </Root>
)

export default injectStyles(styles)(OptionsListItem)
