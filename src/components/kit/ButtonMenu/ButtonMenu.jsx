// @flow
import * as React from 'react'
import DropdownMenu, {
  type DropdownMenuProps,
} from 'components/kit/DropdownMenu'
import type { PopupRenderProps } from 'components/kit/PopupBase'

type Props = {|
  ...DropdownMenuProps,
  //
  alignByArrow?: boolean,
  alignEnd?: boolean,
  alignStart?: boolean,
  arrowEnd?: boolean,
  arrowStart?: boolean,
  down?: boolean,
  renderButton: PopupRenderProps => React.Node,
  up?: boolean,
|}

const ButtonMenu = ({
  renderButton,
  alignStart,
  alignEnd,
  arrowEnd,
  arrowStart,
  up,
  down,
  align: alignProp,
  direction: directionProp,
  arrowAt: arrowAtProp,
  alignByArrow,
  children,
  ...otherProps
}: Props) => {
  const direction = up ? 'up' : down ? 'down' : directionProp
  const align = alignStart ? 'start' : alignEnd ? 'end' : alignProp || 'center'

  const arrowAt = arrowStart ? 'start' : arrowEnd ? 'end' : arrowAtProp

  return (
    <DropdownMenu
      menu={children}
      direction={direction}
      align={align}
      arrowAt={arrowAt}
      alignByArrow={alignByArrow}
      {...otherProps}
    >
      {renderButton}
    </DropdownMenu>
  )
}

export default ButtonMenu
