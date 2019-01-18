// @flow strict-local
import * as React from 'react'
import MoreOptionsIcon from 'material-ui-icons/MoreHoriz'
import ButtonMenu, { type ButtonMenuProps } from 'components/kit/ButtonMenu'
import ToggleButton from 'components/kit/ToggleButton'
import type {
  DropdownMenuChildren,
  DropdownMenuProps,
} from 'components/kit/DropdownMenu'
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
  ...ButtonMenuProps,
  ...DropdownMenuProps,
  //
  className?: string,
  children: DropdownMenuChildren,
|}

const EllipsisButtonMenu = (props: Props) => (
  <ButtonMenu renderButton={renderEllipsisButton} {...props} />
)

export default EllipsisButtonMenu
