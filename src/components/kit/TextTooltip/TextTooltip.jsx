// @flow
import * as React from 'react'
import TooltipBase, { type TooltipBaseProps } from 'components/kit/TooltipBase'
import TextTooltipDumb from './TextTooltipDumb'

type Props = {|
  ...TooltipBaseProps,
  //
  text: string,
  children: React.Element<any>,
|}

const TextTooltip = ({ children, text, ...otherProps }: Props) => (
  // TODO тултип размещается как sibling анкора, нам не нужно автопозиционировать по вьюпорту(тем более что в данном случае оно работает некорректно)
  <TooltipBase distance={5} disableAutoReposition {...otherProps}>
    {({ open, getTargetProps, getTooltipProps }) => (
      <>
        {React.cloneElement(React.Children.only(children), getTargetProps())}
        {open && (
          <TextTooltipDumb {...getTooltipProps()}>{text}</TextTooltipDumb>
        )}
      </>
    )}
  </TooltipBase>
)

TextTooltip.defaultProps = {
  place: 'up',
  align: 'center',
}

export default TextTooltip
