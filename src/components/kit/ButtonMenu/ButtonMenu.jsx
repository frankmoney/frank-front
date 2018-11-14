// @flow
import * as React from 'react'
import DropdownMenu from 'components/kit/DropdownMenu'
import type {
  DropdownMenuChildren,
  DropdownMenuChildrenRenderer,
  DropdownMenuDirection,
  DropdownMenuProps,
} from 'components/kit/DropdownMenu'

type Props = {|
  ...DropdownMenuProps,
  //
  alignEnd?: boolean,
  alignStart?: boolean,
  arrowEnd?: boolean,
  arrowStart?: boolean,
  children?: DropdownMenuChildren,
  direction?: DropdownMenuDirection,
  down?: boolean,
  renderButton: DropdownMenuChildrenRenderer,
  up?: boolean,
|}

const ButtonMenu = ({
  align: alignProp,
  alignByArrow,
  alignEnd,
  alignStart,
  arrowAt: arrowAtProp,
  arrowEnd,
  arrowStart,
  children,
  direction: directionProp,
  down,
  renderButton,
  up,
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
