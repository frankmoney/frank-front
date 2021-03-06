// @flow
import * as React from 'react'
import * as R from 'ramda'
import chainCallbacks from 'utils/dom/chainCallbacks'
import isElementVisible from 'utils/dom/isElementVisible'
import getBody from 'utils/dom/getBody'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'
import Context from './SelectListContext'

type Val = any
type Value = Val | Array<Val>

type EmptyCb = () => void

export type SelectListBaseProps = {|
  activeOnFocus?: boolean,
  autoFocus?: boolean,
  children?: React.Node,
  defaultValue?: Value,
  multiple?: boolean,
  onChange?: Value => void,
  scrollContainer?: Element | WindowProxy,
  value?: Value,
  // ставит активный элемент при фокусе
  onSelectElement?: (?Element) => void,
  onActiveElementChange: (?Element, number, Array<Element>) => void,
|}

type Props = {|
  ...SelectListBaseProps,
|}

type State = {|
  activeElement: ?Element,
  value: Value,
|}

const MENU_STYLE = {
  outline: 'none', // remove focus outline.
}

const DEFAULT_ITEM_STYLE = {
  cursor: 'pointer',
}

const SELECTED_ITEM_STYLE = {
  cursor: 'default',
}

const memoize = fn => {
  const map = new Map()
  return (value: any) => {
    if (map.has(value)) {
      return map.get(value)
    }
    const result = fn(value)
    map.set(value, result)

    return result
  }
}

const getNextListItem = (list, item) => {
  const idx = Array.prototype.indexOf.call(list, item)
  if (idx === -1) {
    return list[0]
  } else if (idx < list.length - 1) {
    return list[idx + 1]
  }
  return list[0]
}

const getPrevListItem = (list, item) => {
  const idx = Array.prototype.indexOf.call(list, item)
  if (idx === -1) {
    return list[0]
  } else if (idx > 0) {
    return list[idx - 1]
  }
  return list[list.length - 1]
}

const normalizeArray = R.pipe(
  R.defaultTo([]),
  R.when(x => !(x instanceof Array), x => [x])
)

class SelectListBase extends React.Component<Props, State> {
  static Consumer = Context.Consumer

  state = {
    value: this.props.multiple
      ? normalizeArray(this.props.defaultValue)
      : this.props.defaultValue,
    activeElement: null,
  }

  componentDidMount() {
    this.scrollInitialViewport(() => {
      if (this.props.autoFocus) {
        this.focus()
      }
    })
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  setPrevActiveElement = (callback?: EmptyCb) => {
    this.setActiveElement(this.getPrevItem(this.state.activeElement), () => {
      this.scrollToElementIfInvisible(this.state.activeElement)
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  setNextActiveElement = (callback?: EmptyCb) => {
    this.setActiveElement(this.getNextItem(this.state.activeElement), () => {
      this.scrollToElementIfInvisible(this.state.activeElement)
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  setActiveElement = (element: ?Element, callback?: EmptyCb) => {
    // TODO controlled activeElement state
    if (this.state.activeElement !== element) {
      this.setState({ activeElement: element }, () => {
        if (typeof this.props.onActiveElementChange === 'function') {
          this.props.onActiveElementChange(
            element,
            this.getItemIndex(element),
            [...this.getListItems()]
          )
        }
        if (typeof callback === 'function') {
          callback()
        }
      })
    }
  }

  setValue = value => {
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

  // flowlint-next-line unsafe-getters-setters:off
  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

  // flowlint-next-line unsafe-getters-setters:off
  get value() {
    return this.isControlledValue ? this.props.value : this.state.value
  }

  // flowlint-next-line unsafe-getters-setters:off
  get hasValue(): boolean {
    return this.props.multiple
      ? !R.isNil(this.value) && !!this.value && this.value.length > 0
      : !R.isNil(this.value)
  }

  // flowlint-next-line unsafe-getters-setters:off
  get scrollContainer() {
    return this.props.scrollContainer || this.containerElement
  }

  getRenderProps = (state: State = this.state) => ({
    value: this.value,
    select: this.setValue,
    activeElement: state.activeElement,
    getContainerProps: (props = {}) => ({
      ...props,
      style: {
        ...MENU_STYLE,
        ...props.style,
      },
      tabIndex: -1,
      ref: this.getContainerRefHandler(props.ref),
      onMouseLeave: chainCallbacks(
        this.handleContainerMouseLeave,
        props.onMouseLeave
      ),
      onKeyDown: chainCallbacks(this.handleContainerKeyDown, props.onKeyDown),
      onFocus: chainCallbacks(this.handleContainerFocus, props.onFocus),
    }),
    getItemProps: ({ value, onSelect, ...props } = {}) => {
      const hasCallback = typeof onSelect === 'function'

      if (R.isNil(value) && !hasCallback) {
        throw new Error(
          'getItemProps should receive either value or onSelect props'
        )
      }

      const selected = this.checkValueIsSelected(value)

      const active =
        !!state.activeElement &&
        (this.itemElementsByValue.get(value) === state.activeElement ||
          this.itemElementsByCallback.get(onSelect) === state.activeElement)

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
        ref: this.getItemRefHandler(hasCallback ? onSelect : value),
        onMouseEnter: chainCallbacks(this.handleMouseEnter, props.onMouseEnter),
        onMouseLeave: chainCallbacks(this.handleMouseLeave, props.onMouseLeave),
        onClick: chainCallbacks(this.handleClick, props.onClick),
      }
    },
  })

  getItemValue = (itemElement: Element) => {
    const found = [...this.itemElementsByValue].find(
      ([_, elem]) => elem === itemElement
    )

    return found && found[0]
  }

  getItemCallback = (itemElement: Element) => {
    const found = [...this.itemElementsByCallback].find(
      ([_, elem]) => elem === itemElement
    )

    return found && found[0]
  }

  // очень важно сохранять реф на каждый айтем,
  // чтобы не происходил mount/unmount всех айтемов при каждом изменении стейта листа
  getItemRefHandler = memoize(valueOrCallback => ref =>
    typeof valueOrCallback === 'function'
      ? this.handleCallbackItemRef(ref, valueOrCallback)
      : this.handleValueItemRef(ref, valueOrCallback)
  )

  getContainerRefHandler = memoize(refHandler =>
    chainCallbacks(refHandler, this.handleContainerRef)
  )

  getListItems = () =>
    this.containerElement.querySelectorAll('*[data-select-role=item]')

  getTopViewportItem = () => {
    const scrollRect = this.scrollContainer.getBoundingClientRect()
    return [...this.getListItems()].find(
      el => scrollRect.top <= el.getBoundingClientRect().top
    )
  }

  getItemIndex = (elem: ?Element) =>
    Array.prototype.indexOf.call(this.getListItems(), elem)

  getNextItem = (elem: ?Element) =>
    elem
      ? getNextListItem(this.getListItems(), elem)
      : this.getTopViewportItem()

  getPrevItem = (elem: ?Element) =>
    elem
      ? getPrevListItem(this.getListItems(), elem)
      : this.getTopViewportItem()

  checkValueIsSelected = (value: Value) =>
    this.hasValue &&
    (this.props.multiple
      ? this.value && this.value.includes(value)
      : value === this.value)

  handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    this.selectElement(event.currentTarget)
  }

  handleContainerRef = containerRef => {
    this.containerElement = unsafeFindDOMNode(containerRef)

    // на всякий случай восстанавливаем пойнтер евенты, если контейнер заанмаунтится раньше
    if (!this.containerElement) {
      this.disablePointerEvents = false
    }
  }

  handleValueItemRef = (itemRef, value: Value) => {
    if (itemRef) {
      const el = unsafeFindDOMNode(itemRef)
      this.itemElementsByValue.set(value, el)
      // мы должны очищать значение только когда пропадают айтемы в списке а не в результате анмаунта всего списка
    } else if (!this.unmounted) {
      const el = this.itemElementsByValue.get(value)
      if (el) {
        this.itemElementsByValue.delete(value)
        // если выбранного элемента нет в дереве, то снимаем выбор
        if (this.checkValueIsSelected(value)) {
          this.deselectValue(value)
        }
      }
    }
  }

  handleCallbackItemRef = (itemRef, callback) => {
    this.itemElementsByCallback.set(callback, unsafeFindDOMNode(itemRef))
  }

  handleMouseEnter = (event: MouseEvent) => {
    const element = event.currentTarget
    this.setActiveElement(element)
  }

  handleContainerMouseLeave = () => {
    if (!this.disablePointerEvents) {
      this.setActiveElement(null)
    }
  }

  handleContainerKeyDown = (event: KeyboardEvent) => {
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
    if (this.props.activeOnFocus) {
      if (!this.state.activeElement) {
        if (this.hasValue) {
          const firstValue = this.props.multiple ? this.value[0] : this.value
          this.setActiveElement(this.itemElementsByValue.get(firstValue))
        } else {
          this.setActiveElement(this.getTopViewportItem())
        }
      }
    }
  }

  selectElement = (element: ?Element) => {
    if (!element) {
      this.setValue(null)
      if (typeof this.props.onSelectElement === 'function') {
        this.props.onSelectElement(null)
      }
      return
    }

    const value = this.getItemValue(element)
    if (!R.isNil(value)) {
      if (this.checkValueIsSelected(value)) {
        // пока только мультиселект может убирать выбранные элементы
        if (this.props.multiple) {
          this.deselectValue(value)
        }
      } else {
        this.selectValue(value)
      }
    }

    const callback = this.getItemCallback(element)
    if (typeof callback === 'function') {
      callback()
    }

    if (typeof this.props.onSelectElement === 'function') {
      this.props.onSelectElement(element)
    }
  }

  deselectValue = (value: Value) => {
    if (this.props.multiple) {
      this.setValue(this.value.filter(x => x !== value))
    } else if (this.value === value) {
      this.setValue(null)
    }
  }

  selectValue = (value: Value) => {
    this.setValue(
      this.props.multiple
        ? R.isNil(value)
          ? []
          : [...this.value, value]
        : value
    )
  }

  selectActiveElement = () => {
    if (!this.state.activeElement) {
      return
    }

    this.selectElement(this.state.activeElement)
  }

  scrollInitialViewport = (callback: EmptyCb) => {
    if (this.hasValue) {
      const firstValue = this.props.multiple ? this.value[0] : this.value
      const selectedElement = this.itemElementsByValue.get(firstValue)
      this.scrollToElementIfInvisible(selectedElement)
    }
    callback()
  }

  scrollToElementIfInvisible = (element: ?Element) => {
    if (!element) {
      return
    }

    const scrollContainer = this.scrollContainer
    const elementRect = element.getBoundingClientRect()

    // прекращаем интеракции с мышью до момента пока юзер не сдвинет курсор
    // это необходимо чтобы предотвращать перескакивание ховера во врема подскрола
    const disablePointerEvents = () => {
      if (!this.disablePointerEvents) {
        getBody().addEventListener(
          'mousemove',
          () => {
            // контейнер может заанмаунтится а потом произойти маузмув
            if (this.containerElement) {
              this.containerElement.style.pointerEvents = 'auto'
              this.disablePointerEvents = false
            }
          },
          { once: true }
        )
        this.containerElement.style.pointerEvents = 'none'
        this.disablePointerEvents = true
      }
    }

    if (!isElementVisible(element, scrollContainer, ['top'])) {
      disablePointerEvents()
      if (scrollContainer === window) {
        window.scrollTo(0, window.pageYOffset + elementRect.top)
      } else {
        scrollContainer.scrollTop +=
          elementRect.top - scrollContainer.getBoundingClientRect().top
      }
    } else if (!isElementVisible(element, scrollContainer, ['bottom'])) {
      disablePointerEvents()
      if (scrollContainer === window) {
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight
        window.scrollTo(
          0,
          window.pageYOffset + (elementRect.bottom - windowHeight)
        )
      } else {
        scrollContainer.scrollTop +=
          elementRect.bottom - scrollContainer.getBoundingClientRect().bottom
      }
    }
  }

  containerElement: Element
  itemElementsByValue: Map<any, Element> = new Map()
  itemElementsByCallback: Map<Function, Element> = new Map()
  unmounted: boolean
  disablePointerEvents: boolean

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
