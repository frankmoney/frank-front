// @flow
/* eslint-disable react/no-find-dom-node */
import React from 'react'
import { findDOMNode } from 'react-dom'
import * as R from 'ramda'
import chainCallbacks from 'utils/dom/chainCallbacks'
import isElementVisible from 'utils/dom/isElementVisible'
import Context from './SelectListContext'

type Props = {
  autoFocus?: boolean,
  scrollContainer?: Element | Window,
}

const MENU_STYLE = {
  outline: 'none', // remove focus outline.
  overflow: 'auto', // cut menuitem background edges
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
      onFocus: chainCallbacks(this.handleContainerFocus, props.onFocus),
    }),
    getItemProps: ({ value, index, ...props } = {}) => {
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
        'data-select-role': 'item',
        'data-select-value': value,
        active,
        ref: this.getItemRefHandler(value),
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

  // очень важно сохранять реф на каждый айтем,
  // чтобы не происходил mount/unmount всех айтемов при каждом изменении стейта листа
  getItemRefHandler = R.memoizeWith(R.identity, value => ref =>
    this.handleItemRef(ref, value)
  )

  getNextItem = elem =>
    elem
      ? elem.nextElementSibling || this.containerElement.children[0]
      : this.containerElement.children[0]

  getPrevItem = elem =>
    elem
      ? elem.previousElementSibling ||
        this.containerElement.children[
          this.containerElement.children.length - 1
        ]
      : this.containerElement.children[0]

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
      // this.itemElements.push(el)
      this.itemElementsByValue[value] = el
    } else {
      const el = this.itemElementsByValue[value]
      if (el) {
        // this.itemElements = this.itemElements.filter(x => x !== el)
        delete this.itemElementsByValue[value]
        // если выбранного элемента нет в дереве, то снимаем выбор
        if (typeof this.value !== 'undefined' && this.value === value) {
          this.select(null)
        }
      }
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

  handleContainerFocus = () => {}

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

  setActiveElement = (element, callback) => {
    // TODO controlled activeElement state
    if (this.state.activeElement !== element) {
      this.setState({ activeElement: element }, callback)
    }
  }

  setNextActiveElement = callback => {
    this.setActiveElement(this.getNextItem(this.state.activeElement), () => {
      this.scrollToElementIfInvisible(this.state.activeElement)
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  setPrevActiveElement = callback => {
    this.setActiveElement(this.getPrevItem(this.state.activeElement), () => {
      this.scrollToElementIfInvisible(this.state.activeElement)
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  scrollToElementIfInvisible = element => {
    if (!element) {
      return
    }

    const container = this.props.scrollContainer || this.containerElement
    const elementRect = element.getBoundingClientRect()
    if (!isElementVisible(element, container, ['top'])) {
      if (container === window) {
        window.scrollTo(0, window.pageYOffset + elementRect.top)
      } else {
        container.scrollTop +=
          elementRect.top - container.getBoundingClientRect().top
      }
    } else if (!isElementVisible(element, container, ['bottom'])) {
      if (container === window) {
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight
        window.scrollTo(
          0,
          window.pageYOffset + (elementRect.bottom - windowHeight)
        )
      } else {
        container.scrollTop +=
          elementRect.bottom - container.getBoundingClientRect().bottom
      }
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    } else if (typeof this.value !== 'undefined') {
      const selectedElement = this.itemElementsByValue[this.value]
      this.setActiveElement(selectedElement, () => {
        this.scrollToElementIfInvisible(this.state.activeElement)
      })
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
