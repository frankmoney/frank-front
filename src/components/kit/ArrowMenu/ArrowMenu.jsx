// @flow
import * as React from 'react'
import ArrowPaper, {
  DEFAULT_ALIGN,
  DEFAULT_DIRECTION,
} from 'components/kit/ArrowPaper'
import Menu from 'components/kit/Menu'

// TODO: merge from ArrowPaper and MenuProps props
export type Props = {|
  direction: 'up' | 'left' | 'right' | 'down',
  align: 'center' | 'start' | 'end',
  children?: React.Node,
|}

type State = {|
  arrowColor: ?any, // TODO: fix the type
|}

class DropdownMenu extends React.Component<Props, State> {
  static defaultProps = {
    direction: DEFAULT_DIRECTION,
    align: DEFAULT_ALIGN,
  }

  state = {
    arrowColor: null,
  }

  handleChangeActiveItem = (itemElement, currentIndex, allItemElements) => {
    // TODO overflow list брать индекс не первого последнего в списке а во ВЬЮПОРТЕ
    const { direction } = this.props
    const lastIndex = allItemElements.length - 1
    // eslint-disable-next-line no-nested-ternary
    const targetIndex =
      direction === 'up' ? 0 : direction === 'down' ? lastIndex : -1

    const color =
      itemElement && currentIndex === targetIndex
        ? itemElement.dataset.activeColor
        : null

    if (this.state.arrowColor !== color) {
      this.setState({ arrowColor: color })
    }

    if (typeof this.props.onActiveElementChange === 'function') {
      this.props.onActiveElementChange(
        itemElement,
        currentIndex,
        allItemElements
      )
    }
  }

  render() {
    const {
      direction,
      align,
      arrowProps,
      children,
      menuItemProps,
      ...menuProps
    } = this.props

    const { arrowColor } = this.state
    const arrowColorStyle = { color: arrowColor }
    const mergedArrowProps = arrowProps
      ? { ...arrowProps, style: { ...arrowProps.style, ...arrowColorStyle } }
      : { style: arrowColorStyle }

    return (
      <Menu
        component={ArrowPaper}
        onActiveElementChange={this.handleChangeActiveItem}
        arrowProps={mergedArrowProps}
        direction={direction}
        align={align}
        menuItemProps={{ noAnimation: true, ...menuItemProps }}
        {...menuProps}
      >
        {children}
      </Menu>
    )
  }
}

export default DropdownMenu
