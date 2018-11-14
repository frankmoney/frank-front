// @flow
import * as React from 'react'
import MoreOptionsIcon from 'material-ui-icons/MoreHoriz'
import ButtonMenu from 'components/kit/ButtonMenu'
import ToggleButton from 'components/kit/ToggleButton'
import type { DropdownMenuChildren } from 'components/kit/DropdownMenu'
import type { PopupRenderProps } from 'components/kit/PopupBase'

const renderEllipsisButton = (popupState: PopupRenderProps) => (
  <ToggleButton.Icon
    icon={<MoreOptionsIcon />}
    on={popupState.open}
    onClick={popupState.toggle}
    {...popupState.getAnchorProps()}
  />
)

type Props = {|
  children: DropdownMenuChildren,
|}

const EllipsisButtonMenu = ({ children }: Props) => (
  <ButtonMenu arrowEnd alignByArrow renderButton={renderEllipsisButton}>
    {children}
  </ButtonMenu>
)

export default EllipsisButtonMenu
