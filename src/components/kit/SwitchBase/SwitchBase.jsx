// @flow
import * as React from 'react'

export type OnChangeCb = boolean => void

export type SwitchBaseRenderProps = {|
  on: boolean,
  focus: boolean,
  focusIn: Function,
  focusOut: Function,
  toggle: OnChangeCb,
|}

type SFC<T> = (props: T) => React.Node

type Props = {|
  children?: SFC<SwitchBaseRenderProps> | string,
  defaultOn: boolean,
  on?: boolean,
  onToggle?: OnChangeCb,
|}

type State = SwitchBaseRenderProps

const SwitchContext = React.createContext({})

export default class SwitchBase extends React.Component<Props, State> {
  static Consumer = SwitchContext.Consumer

  static defaultProps = {
    defaultOn: false,
  }

  state: State = {
    on: this.props.defaultOn,
    focus: false,
    toggle: this.toggle,
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlled() {
    return typeof this.props.on !== 'undefined'
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlledFocus() {
    return typeof this.props.focus !== 'undefined'
  }

  getState = (state: State) => ({
    on: this.isControlled ? !!this.props.on : state.on,
    focus: this.isControlledFocus ? !!this.props.focus : state.focus,
    focusIn: this.focusIn,
    focusOut: this.focusOut,
    toggle: this.toggle,
  })

  toggle = () => {
    if (!this.isControlled) {
      this.setState(
        state => ({ on: !state.on }),
        () => {
          if (typeof this.props.onToggle === 'function') {
            this.props.onToggle(this.state.on)
          }
        }
      )
    } else if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(!this.props.on)
    }
  }

  focusIn = event => {
    if (!this.isControlledFocus) {
      this.setState({ focus: true }, () => {
        if (typeof this.props.onFocus === 'function') {
          this.props.onFocus()
        }
      })
    } else if (typeof this.props.onFocus === 'function') {
      return this.props.onFocus(event)
    }
  }

  focusOut = event => {
    if (!this.isControlledFocus) {
      this.setState({ focus: false }, () => {
        if (typeof this.props.onBlur === 'function') {
          this.props.onBlur()
        }
      })
    } else if (typeof this.props.onBlur === 'function') {
      return this.props.onBlur(event)
    }
  }

  render() {
    const { children } = this.props
    const state = this.getState(this.state)

    return (
      <SwitchContext.Provider value={state}>
        {typeof children === 'function' ? children(state) : children}
      </SwitchContext.Provider>
    )
  }
}
