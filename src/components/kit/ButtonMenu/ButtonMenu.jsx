// @flow
import React from 'react'
import DropdownMenu from 'components/kit/DropdownMenu'
import type { Props as DropdownMenuProps } from 'components/kit/DropdownMenu'
import type { RenderProps as PopupRenderProps } from 'components/kit/PopupBase'

type Props = {
  renderButton: PopupRenderProps => React.ReactElement,
  alignStart?: boolean,
  alignEnd?: boolean,
  alignCenter?: boolean,
  up?: boolean,
  down?: boolean,
} & DropdownMenuProps

const ButtonMenu = ({
  renderButton,
  alignStart,
  alignEnd,
  alignCenter,
  up,
  down,
  align: alignProp,
  direction: directionProp,
  children,
  ...otherProps
}: Props) => {
  const direction = up ? 'up' : down ? 'down' : directionProp
  const align = alignStart
    ? 'start'
    : alignCenter
      ? 'center'
      : alignEnd
        ? 'end'
        : alignProp

  return (
    <DropdownMenu
      popup={children}
      direction={direction}
      align={align}
      {...otherProps}
    >
      {renderButton}
    </DropdownMenu>
  )
}

export default ButtonMenu
