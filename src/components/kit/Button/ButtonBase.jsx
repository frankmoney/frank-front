// @flow strict-local
import * as React from 'react'
import CleanLink from 'components/kit/CleanLink'
import HtmlButton from './HtmlButton'

export type ButtonBaseProps = {|
  width?: number,
  href?: string,
  externalLink?: boolean,
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

  if (otherProps.href) {
    const { type, externalLink, ...linkProps } = otherProps

    return (
      <CleanLink style={computedStyle} external={externalLink} {...linkProps}>
        {children}
      </CleanLink>
    )
  }

  return (
    <HtmlButton style={computedStyle} {...otherProps}>
      {children}
    </HtmlButton>
  )
}

export default ButtonBase
