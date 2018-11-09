// @flow
import * as React from 'react'
import ArrowMenu from 'components/kit/ArrowMenu'
import Menu from 'components/kit/Menu'
import Modal from 'components/kit/Modal'
import PopupBase, {
  type PopupAlign,
  type PopupPosition,
  type PopupRenderProps,
} from 'components/kit/PopupBase'

export type DropdownMenuDirection = PopupPosition

const REVERSE_DIRECTION: { [DropdownMenuDirection]: DropdownMenuDirection } = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export type DropdownMenuProps = {|
  align?: PopupAlign,
  alignByArrow?: boolean,
  arrowAt?: 'start' | 'center' | 'end',
|}

type DropdownMenuChildrenRenderer = PopupRenderProps => React.Node

export type DropdownMenuChildren =
  | React.Element<any>
  | DropdownMenuChildrenRenderer

type OmittedProps = {|
  onClose?: Function, // why?
|}

type Props = {|
  ...DropdownMenuProps,
  ...OmittedProps,
  //
  children?: DropdownMenuChildren,
  direction: DropdownMenuDirection,
  menu?: DropdownMenuChildren,
  menuProps?: Object, // FIXME
  renderMenuContent?: DropdownMenuChildrenRenderer,
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
                  {menu ||
                    (typeof renderMenuContent === 'function' &&
                      renderMenuContent(popupState))}
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
