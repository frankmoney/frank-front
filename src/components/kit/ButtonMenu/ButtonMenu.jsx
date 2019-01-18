// @flow strict-local
import * as React from 'react'
import DropdownMenu from 'components/kit/DropdownMenu'
import type {
  DropdownMenuChildren,
  DropdownMenuChildrenRenderer,
  DropdownMenuDirection,
  DropdownMenuProps,
} from 'components/kit/DropdownMenu'

export type ButtonMenuProps = {|
  alignEnd?: boolean,
  alignStart?: boolean,
  arrowEnd?: boolean,
  arrowStart?: boolean,
  arrowCenter?: boolean,
  up?: boolean,
|}

type Props = {|
  ...ButtonMenuProps,
  ...DropdownMenuProps,
  //
  children?: DropdownMenuChildren,
  className?: string,
  direction?: DropdownMenuDirection,
  down?: boolean,
  renderButton: DropdownMenuChildrenRenderer,
|}

const ButtonMenu = ({
  align: alignProp,
  alignByArrow,
  alignEnd,
  alignStart,
  arrowAt: arrowAtProp,
  arrowEnd,
  arrowStart,
  arrowCenter,
  children,
  direction: directionProp,
  down,
  renderButton,
  up,
  ...otherProps
}: Props) => {
  const direction = up ? 'up' : down ? 'down' : directionProp
  const align = alignStart ? 'start' : alignEnd ? 'end' : alignProp || 'center'

  const arrowAt = arrowStart
    ? 'start'
    : arrowEnd
      ? 'end'
      : arrowCenter
        ? 'center'
        : arrowAtProp

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
