// @flow
/* eslint-disable react/no-find-dom-node */
import React from 'react'
import { findDOMNode } from 'react-dom'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Context from './SelectListContext'

type Props = {
  autoFocus?: boolean,
}

const MENU_STYLE = {
  outline: 'none', // remove focus outline.
  overflow: 'hidden', // cut menuitem background edges
}

const DEFAULT_ITEM_STYLE = {
  cursor: 'pointer',
}

const SELECTED_ITEM_STYLE = {
  cursor: 'default',
  pointerEvents: 'none',
}

class SelectListBase extends React.Component<Props> {
  static Consumer = Context.Consumer

  state = {
    value: this.props.defaultValue,
    activeElement: null,
  }

  containerElement: ?Element = null
  itemElements: Array<Element> = []
  itemElementsByValue: { [string]: Element } = {}

  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

  get value() {
    return this.isControlledValue ? this.props.value : this.state.value
  }

  getRenderProps = (state = this.state) => ({
    value: this.value,
    select: this.select,
    activeElement: state.activeElement,
    getContainerProps: (props = {}) => ({
      ...props,
      style: {
        ...MENU_STYLE,
        ...props.style,
      },
      tabIndex: -1,
      ref: chainCallbacks(this.handleContainerRef, props.ref),
      onMouseLeave: chainCallbacks(
        this.handleContainerMouseLeave,
        props.onMouseLeave
      ),
      onKeyDown: chainCallbacks(this.handleContainerKeyDown, props.onKeyDown),
    }),
    getItemProps: ({ value, ...props } = {}) => {
      const selected = typeof this.value !== 'undefined' && value === this.value
      const active =
        !!state.activeElement &&
        this.itemElementsByValue[value] === state.activeElement

      return {
        ...props,
        selected,
        style: {
          ...(selected ? SELECTED_ITEM_STYLE : DEFAULT_ITEM_STYLE),
          ...props.style,
        },
        active,
        ref: r => this.handleItemRef(r, value),
        onMouseEnter: chainCallbacks(this.handleMouseEnter, props.onMouseEnter),
        onMouseLeave: chainCallbacks(this.handleMouseLeave, props.onMouseLeave),
        onClick: chainCallbacks(this.handleClick, props.onClick),
      }
    },
  })

  getItemValue = itemElement => {
    const found = Object.entries(this.itemElementsByValue).find(
      ([_, elem]) => elem === itemElement
    )

    return found && found[0]
  }

  handleClick = event => {
    event.stopPropagation()
    const value = this.getItemValue(event.currentTarget)

    if (value) {
      this.select(value)
    }
  }

  handleContainerRef = containerRef => {
    this.containerElement = findDOMNode(containerRef)
  }

  handleItemRef = (itemRef, value) => {
    if (itemRef) {
      const el = findDOMNode(itemRef)
      this.itemElements.push(el)
      this.itemElementsByValue[value] = el
    }
  }

  handleMouseEnter = event => {
    const element = event.currentTarget
    this.setActiveElement(element)
  }

  handleContainerMouseLeave = () => {
    this.setActiveElement(null)
  }

  handleContainerKeyDown = event => {
    switch (event.key) {
      case 'ArrowUp':
        this.setPrevActiveElement()
        event.preventDefault()
        event.stopPropagation()
        break
      case 'ArrowDown':
        this.setNextActiveElement()
        event.preventDefault()
        event.stopPropagation()
        break
      case 'Enter':
        this.selectActiveElement()
        event.preventDefault()
        break
      default:
        break
    }
  }

  focus = () => {
    this.containerElement.focus()
    if (!this.state.activeElement) {
      if (this.value) {
        this.setActiveElement(this.itemElementsByValue[this.value])
      } else {
        this.setActiveElement(this.itemElements[0])
      }
    }
  }

  select = value => {
    if (this.isControlledValue) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value)
      }
    } else {
      this.setState({ value }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.value)
        }
      })
    }
  }

  selectActiveElement = () => {
    if (!this.state.activeElement) {
      return
    }

    const value = this.getItemValue(this.state.activeElement)

    if (value) {
      this.select(value)
    }
  }

  setActiveElement = element => {
    // TODO controlled activeElement state
    if (this.state.activeElement !== element) {
      // console.log('active', element);
      this.setState({ activeElement: element })
    }
  }

  setNextActiveElement = () => {
    let nextIdx = 0
    if (this.state.activeElement) {
      const idx = this.itemElements.indexOf(this.state.activeElement)
      if (idx !== -1 && idx < this.itemElements.length - 1) {
        nextIdx = idx + 1
      }
    }

    this.setActiveElement(this.itemElements[nextIdx])
  }

  setPrevActiveElement = () => {
    let nextIdx = 0
    if (this.state.activeElement) {
      const idx = this.itemElements.indexOf(this.state.activeElement)
      if (idx !== -1) {
        if (idx === 0) {
          nextIdx = this.itemElements.length - 1
        } else {
          nextIdx = idx - 1
        }
      }
    }

    this.setActiveElement(this.itemElements[nextIdx])
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  render() {
    let content
    const state = this.getRenderProps(this.state)
    if (typeof this.props.children === 'function') {
      content = this.props.children(state)
    } else {
      content = this.props.children
    }

    return <Context.Provider value={state}>{content}</Context.Provider>
  }
}

export default SelectListBase
