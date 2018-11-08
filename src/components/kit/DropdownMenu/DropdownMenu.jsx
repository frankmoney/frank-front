// @flow
import * as React from 'react'
import Backdrop from 'components/kit/Backdrop'
import Menu from 'components/kit/Menu'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase from 'components/kit/PopupBase'
import createPortalInBody from 'utils/dom/createPortal'

const REVERSE_DIRECTION = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export type DropdownMenuProps = {|
  direction: 'up' | 'down',
  align?: 'start' | 'center' | 'end',
  alignByArrow?: boolean,
  arrowAt?: 'start' | 'center' | 'end',
|}

type Props = {|
  ...DropdownMenuProps,
  //
  children?: React.Element<any>,
|}

const DEFAULT_WIDTH = 250

class DropdownMenu extends React.Component<Props> {
  static defaultProps = {
    direction: 'down',
    align: 'center',
    alignByArrow: false,
  }

  render() {
    const {
      direction,
      align,
      arrowAt,
      alignByArrow,
      children,
      menuProps = { style: { width: DEFAULT_WIDTH } },
      menu,
      renderMenuContent,
      onClose,
      ...otherProps
    } = this.props

    const hasArrow = !!arrowAt
    const MenuComponent = hasArrow ? ArrowMenu : Menu

    return (
      <PopupBase
        place={direction}
        align={align}
        alignByArrow={alignByArrow}
        distance={15}
        {...otherProps}
      >
        {popupState => {
          const { open, close, getPopupProps, getArrowProps } = popupState

          const arrowMenuProps = hasArrow
            ? {
                direction: REVERSE_DIRECTION[direction],
                align: arrowAt,
                arrowProps: hasArrow && getArrowProps(),
              }
            : {}

          return (
            <>
              {typeof children === 'function' && children(popupState)}
              {open &&
                createPortalInBody(
                  <Backdrop transparent onClick={close}>
                    <MenuComponent
                      autoFocus
                      onSelectElement={close}
                      {...arrowMenuProps}
                      {...getPopupProps(menuProps)}
                    >
                      {menu || renderMenuContent(popupState)}
                    </MenuComponent>
                  </Backdrop>
                )}
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default DropdownMenu
