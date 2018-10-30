// @flow
import React from 'react'
import { createPortal } from 'react-dom'
import Backdrop from 'components/kit/Backdrop'
import Menu from 'components/kit/Menu'
import Button from 'components/kit/Button'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase from 'components/kit/PopupBase'
import SelectValue from './SelectValue'

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

class Select extends React.Component<Props> {
  static defaultProps = {
    direction: 'down',
    align: 'center',
    alignByArrow: false,
  }

  state = {
    value: this.props.defaultValue,
    open: this.props.defaultOpen,
    select: this.handleChange,
  }

  handleChange = value => {
    this.setState({ value, open: false })
  }

  handleTogglePopup = open => {
    this.setState({ open })
  }

  render() {
    const {
      direction,
      align,
      arrowAt,
      alignByArrow,
      children,
      menuProps = { style: { width: DEFAULT_WIDTH } },
      renderValue,
      onClose,
      ...otherProps
    } = this.props

    const hasArrow = !!arrowAt
    const MenuComponent = hasArrow ? ArrowMenu : Menu

    const menuState = { value: this.state.value }

    return (
      <PopupBase
        open={this.state.open}
        onChangeOpen={this.handleTogglePopup}
        place={direction}
        align={align}
        alignByArrow={alignByArrow}
        distance={hasArrow ? 15 : 0}
        {...otherProps}
      >
        {popupState => {
          const {
            open,
            toggle,
            close,
            getPopupProps,
            getArrowProps,
            getAnchorProps,
          } = popupState

          const arrowMenuProps = hasArrow
            ? {
                direction: REVERSE_DIRECTION[direction],
                align: arrowAt,
                arrowProps: hasArrow && getArrowProps(),
              }
            : {}

          return (
            <>
              <SelectValue
                value={
                  typeof renderValue === 'function'
                    ? renderValue(this.state.value)
                    : this.state.value
                }
                onClick={toggle}
                {...getAnchorProps()}
              />
              {open &&
                createPortal(
                  <Backdrop transparent onClick={close}>
                    <MenuComponent
                      autoFocus
                      value={this.state.value}
                      onChange={this.handleChange}
                      {...arrowMenuProps}
                      {...getPopupProps(menuProps)}
                    >
                      {children}
                    </MenuComponent>
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

export default Select
