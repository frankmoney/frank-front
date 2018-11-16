// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { NavLink } from 'react-router-dom'
import styles from './SidebarMenuItem.jss'

type Props = {
  primaryText: Element | string,
  secondaryText: Element | string | number,
  rightIcon?: () => Element | Element,
  leftIcon?: () => Element | Element,
  classes: {},
  className: string,
  href?: string,
  navLinkComponent?: () => Element,
  theme: {},
  withSeparator?: boolean,
  isHeader: boolean,
}

const cloneOrCreateReactElement = (elementOrComponent, newProps = {}) =>
  React.isValidElement(elementOrComponent)
    ? React.cloneElement(elementOrComponent, {
        ...newProps,
        className: cx(newProps.className, elementOrComponent.props.className),
      })
    : React.createElement(elementOrComponent, newProps)

const SidebarMenuItem = ({
  primaryText,
  secondaryText,
  leftIcon,
  rightIcon,
  classes,
  className,
  href,
  navLinkComponent: NavLinkComponent = NavLink,
  theme,
  withSeparator,
  isHeader,
  ...otherProps
}: Props) => {
  const content = (
    <>
      {leftIcon &&
        cloneOrCreateReactElement(leftIcon, {
          className: classes.iconLeft,
        })}
      <span className={classes.primaryText}>{primaryText}</span>
      {!!secondaryText && (
        <span className={classes.secondaryText}>{secondaryText}</span>
      )}
      {rightIcon &&
        cloneOrCreateReactElement(rightIcon, {
          className: classes.iconRight,
        })}
    </>
  )

  return href ? (
    <NavLinkComponent
      className={cx(classes.menuItem, className)}
      activeClassName={classes.menuItemActive}
      to={href}
      {...otherProps}
    >
      {content}
    </NavLinkComponent>
  ) : (
    <div className={cx(classes.menuItem, className)} {...otherProps}>
      {content}
    </div>
  )
}

SidebarMenuItem.defaultProps = {}

export default compose(injectStyles(styles))(SidebarMenuItem)
