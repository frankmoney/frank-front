// @flow
import * as React from 'react'
import DropdownMenu, {
  type DropdownMenuProps,
} from 'components/kit/DropdownMenu'
import type { PopupRenderProps } from 'components/kit/PopupBase'

type Props = {|
  ...DropdownMenuProps,
  //
  renderButton: PopupRenderProps => React.Node,
  alignStart?: boolean,
  alignEnd?: boolean,
  up?: boolean,
  down?: boolean,
  arrowStart?: boolean,
  arrowEnd?: boolean,
  alignByArrow?: boolean,
|}

const Select = ({
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
      popup={children}
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

export default Select
