// @flow strict-local
import * as React from 'react'

type DOMEventHandler = Event => void

type Style = Object // flowlint-line unclear-type:warn

type RootComponent = string | React.ComponentType<any> // flowlint-line unclear-type:off

export type ButtonBaseProps = {|
  component: RootComponent,
  width?: number,
  style: Style,
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
|}

class ButtonBase extends React.Component<Props> {
  static defaultProps = {
    component: 'div',
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (
      (event.key === ' ' || event.key === 'Enter') &&
      event.target === event.currentTarget
    ) {
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

export default ButtonBase
