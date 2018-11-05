// @flow
import * as React from 'react'

type DOMEventHandler = Event => void

export type ButtonBaseProps = {|
  component: string | React.ComponentType<any>,
  onBlur: DOMEventHandler,
  onClick: DOMEventHandler,
  onFocus: DOMEventHandler,
  onMouseEnter: DOMEventHandler,
  onMouseLeave: DOMEventHandler,
  onMouseOver: DOMEventHandler,
  onTouchEnd: DOMEventHandler,
  onTouchStart: DOMEventHandler,
|}

type Props = {|
  ...ButtonBaseProps,
  //
  children?: React.Node,
  className?: string,
  href?: string,
|}

const BaseButton = ({
  children,
  className,
  component: Root,
  href,
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  onTouchEnd,
  onTouchStart,
}: Props) => (
  <Root
    href={href}
    role="button"
    tabIndex={0}
    className={className}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onFocus={onFocus}
    onBlur={onBlur}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    {children}
  </Root>
)

BaseButton.defaultProps = {
  component: 'div',
}

export default BaseButton
