// @flow
import React, { cloneElement } from 'react'
import { createPortal } from 'react-dom'
import TooltipBase from 'components/kit/TooltipBase'
import type { Props as TooltipBaseProps } from 'components/kit/TooltipBase'
import TextTooltipDumb from './TextTooltipDumb'

type Props = {
  text: string,
  children: React.ReactElement,
} & TooltipBaseProps

const TextTooltip = ({ children, text, ...otherProps }: Props) => (
  <TooltipBase distance={4} {...otherProps}>
    {({ open, getTargetProps, getTooltipProps }) => (
      <>
        {cloneElement(React.Children.only(children), getTargetProps())}
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
