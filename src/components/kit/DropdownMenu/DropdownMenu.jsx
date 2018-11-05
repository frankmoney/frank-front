// @flow
import React from 'react'
import Modal from 'components/kit/Modal'
import Menu from 'components/kit/Menu'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase from 'components/kit/PopupBase'

const REVERSE_DIRECTION = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export type Props = {
  direction?: 'up' | 'down',
  align?: 'start' | 'center' | 'end',
  alignByArrow?: boolean,
  arrowAt?: 'start' | 'center' | 'end',
}

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
        enableViewportOffset
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
              <Modal open={open} invisibleBackdrop onClose={close}>
                <MenuComponent
                  onSelectElement={close}
                  {...arrowMenuProps}
                  {...getPopupProps(menuProps)}
                >
                  {menu || renderMenuContent(popupState)}
                </MenuComponent>
              </Modal>
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default DropdownMenu
