// @flow
import * as React from 'react'
import { createPortal } from 'react-dom'
import TooltipBase from 'components/kit/TooltipBase'
import type { TooltipBaseProps } from 'components/kit/TooltipBase'
import TextTooltipDumb from './TextTooltipDumb'

type Props = {
  text: string,
  children: React.Element<any>,
} & TooltipBaseProps

const TextTooltip = ({ children, text, ...otherProps }: Props) => (
  <TooltipBase distance={4} {...otherProps}>
    {({ open, getTargetProps, getTooltipProps }) => (
      <>
        {React.cloneElement(React.Children.only(children), getTargetProps())}
        {open &&
          createPortal(
            <TextTooltipDumb {...getTooltipProps()}>{text}</TextTooltipDumb>,
            document.body
          )}
      </>
    )}
  </TooltipBase>
)

export default TextTooltip
