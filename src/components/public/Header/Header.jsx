import React from 'react'
import cx from 'classnames'
import { compose, pure, withProps } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { detectScrolling } from '@frankmoney/utils'

const styles = theme => ({
  fixedHeader: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    height: 83,
    display: ({ hidden }) => (hidden ? 'none' : 'flex'),
    alignItems: 'center',
    backgroundColor: ({ isScrolled }) => (isScrolled ? '#fff' : 'transparent'),
    boxShadow: ({ isScrolled }) =>
      isScrolled ? '0 1px 2px 0 rgba(0,0,0,0.2)' : 'none',
    zIndex: theme.zIndex.header,
    padding: 0,
  },
})

const Header = ({
  children,
  classes,
  className,
  isScrolled,
  scrolledClassName,
}) => (
  <div
    className={cx(
      classes.fixedHeader,
      isScrolled && scrolledClassName,
      className
    )}
  >
    {children}
  </div>
)

export default compose(
  detectScrolling(['isScrolled', 'scrollTop']),
  withProps(({ isScrolled, scrollTop, offset }) => ({
    hidden: offset && (!isScrolled || scrollTop <= offset),
  })),
  pure,
  injectStyles(styles)
)(Header)
