// @flow strict-local
import * as React from 'react'
import HtmlButton from './HtmlButton'
import HtmlLink from './HtmlLink'

export type ButtonBaseProps = {|
  width?: number,
  href?: string,
|}

type Style = {|
  width?: number,
|}

type Props = {|
  ...ButtonBaseProps,
  //
  children?: React.Node,
  className?: string,
  style?: Style,
|}

const ButtonBase = ({ children, style, width, ...otherProps }: Props) => {
  let computedStyle = width ? { width } : {}

  if (style) {
    computedStyle = { ...computedStyle, ...style }
  }

  const Root = otherProps.href ? HtmlLink : HtmlButton

  return (
    <Root style={computedStyle} {...otherProps}>
      {children}
    </Root>
  )
}

export default ButtonBase
