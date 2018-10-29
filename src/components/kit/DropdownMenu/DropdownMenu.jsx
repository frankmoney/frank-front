// @flow
import React from 'react'
import { createPortal } from 'react-dom'
import ArrowPaper from 'components/kit/ArrowPaper'
import Backdrop from 'components/kit/Backdrop'
import Menu from 'components/kit/Menu/Menu'
import Paper from 'components/kit/Paper'
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
}

class DropdownMenu extends React.Component<Props> {
  static defaultProps = {
    direction: 'down',
    align: 'center',
  }

  state = {
    arrowColor: null,
  }

  handleChangeActiveItem = (itemElement, currentIndex, allItemElements) => {
    const { direction } = this.props
    const lastIndex = allItemElements.length - 1
    // eslint-disable-next-line no-nested-ternary
    const targetIndex =
      direction === 'down' ? 0 : direction === 'up' ? lastIndex : -1

    const color =
      itemElement && currentIndex === targetIndex
        ? itemElement.dataset.activeColor
        : null

    if (this.state.arrowColor !== color) {
      this.setState({ arrowColor: color })
    }
  }

  handleClose = () => {
    if (this.state.arrowColor) {
      this.setState({ arrowColor: null })
    }
  }

  render() {
    const {
      direction,
      arrow,
      align,
      children,
      // todo inherit parent border radius. impl Paper.Content with PaperContext
      menuProps = { style: { width: 250, borderRadius: 8 } },
      popup,
      renderPopup,
      onClose,
      ...otherProps
    } = this.props

    const { arrowColor } = this.state

    const PaperComponent = arrow ? ArrowPaper : Paper

    return (
      <PopupBase
        place={direction}
        align={align}
        distance={15}
        onClose={this.handleClose}
        {...otherProps}
      >
        {popupState => {
          const { open, close, getPopupProps, getArrowProps } = popupState

          return (
            <>
              {typeof children === 'function' && children(popupState)}
              {open &&
                createPortal(
                  <Backdrop transparent onClick={close}>
                    <PaperComponent
                      {...getPopupProps()}
                      arrowProps={
                        arrow && getArrowProps({ style: { color: arrowColor } })
                      }
                      direction={REVERSE_DIRECTION[direction]}
                      align={align}
                    >
                      <Menu
                        autoFocus
                        component="div"
                        {...menuProps}
                        onSelectElement={close}
                        onActiveElementChange={
                          arrow && this.handleChangeActiveItem
                        }
                        menuItemProps={{ noAnimation: true }}
                      >
                        {popup || renderPopup(popupState)}
                      </Menu>
                    </PaperComponent>
                  </Backdrop>,
                  document.body
                )}
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default DropdownMenu
