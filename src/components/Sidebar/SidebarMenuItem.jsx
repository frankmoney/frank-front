// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { NavLink } from 'react-router-dom'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import styles from './SidebarMenuItem.jss'

type Props = {|
  ...InjectStylesProps,
  //
  primaryText: Element | string,
  secondaryText: Element | string | number,
  rightIcon?: () => Element | Element,
  leftIcon?: () => Element | Element,
  href?: string,
  navLinkComponent?: () => Element,
  theme: {},
  withSeparator?: boolean,
  isHeader: boolean,
|}

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
      className={cx(classes.root, className)}
      activeClassName={classes.active}
      to={href}
      {...otherProps}
    >
      {content}
    </NavLinkComponent>
  ) : (
    <div className={cx(classes.root, className)} {...otherProps}>
      {content}
    </div>
  )
}

SidebarMenuItem.defaultProps = {}

export default compose(injectStyles(styles))(SidebarMenuItem)
