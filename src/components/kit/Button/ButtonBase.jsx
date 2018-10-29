// @flow
import React from 'react'

type DOMEventHandler = Event => void

type Props = {
  component: string | React.ComponentType,
  onBlur: DOMEventHandler,
  onClick: DOMEventHandler,
  onFocus: DOMEventHandler,
  onMouseLeave: DOMEventHandler,
  onMouseOver: DOMEventHandler,
  onTouchEnd: DOMEventHandler,
  onTouchStart: DOMEventHandler,
}

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

BaseButton.propTypes = {}

BaseButton.defaultProps = {
  component: 'div',
  targetBlank: false,
}

export default BaseButton
