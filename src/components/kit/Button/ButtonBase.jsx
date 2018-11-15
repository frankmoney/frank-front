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
  width?: number,
  style: Object,
|}

class BaseButton extends React.Component<Props> {
  static defaultProps = {
    component: 'div',
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.target === event.currentTarget) {
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(event)
      }
    }
  }

  render() {
    const {
      children,
      className,
      component: Root,
      href,
      style,
      width,
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onTouchEnd,
      onTouchStart,
    } = this.props

    let computedStyle = width ? { width } : {}

    if (style) {
      computedStyle = { ...computedStyle, ...style }
    }

    return (
      <Root
        href={href}
        role="button"
        tabIndex={0}
        style={computedStyle}
        className={className}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyPress={this.handleKeyPress}
      >
        {children}
      </Root>
    )
  }
}
export default BaseButton
