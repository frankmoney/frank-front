// @flow
import React, { createFactory } from 'react'
import chainCallbacks from '../../../utils/dom/chainCallbacks'
import SelectListBase from './SelectListBase'

class SelectListBaseItem extends React.Component {
  state = {}

  componentDidMount() {
    this.props.selectList.registerItem(findDOMNode(this), this.props)
    this.element = findDOMNode(this)
  }

  componentWillUnmount() {}

  handleMouseEnter = event => {
    const element = event.currentTarget
    this.list.setActiveElement(element)
  }

  getRenderProps = (state = this.state) => {
    const selected =
      typeof this.props.value !== 'undefined' && value === this.props.value
    const active = !!state.activeElement && element === state.activeElement

    return {
      ...props,
      selected,
      style: {
        ...(selected ? SELECTED_ITEM_STYLE : DEFAULT_ITEM_STYLE),
        ...props.style,
      },
      'data-select-role': 'item',
      'data-select-value': value,
      active,
      ref: this.getItemRefHandler(value),
      onMouseEnter: chainCallbacks(this.handleMouseEnter, props.onMouseEnter),
      onClick: chainCallbacks(this.handleClick, props.onClick),
    }
  }

  render() {}
}

export default SelectListBaseItem
