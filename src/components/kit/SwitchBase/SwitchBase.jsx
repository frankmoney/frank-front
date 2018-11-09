// @flow
import * as React from 'react'

export type OnChangeCb = boolean => void

export type SwitchBaseChildrenProps = {|
  on: boolean,
  toggle: OnChangeCb,
|}

type SFC<T> = (props: T) => React.Node

type Props = {|
  children?: SFC<SwitchBaseChildrenProps> | string,
  defaultOn: boolean,
  on?: boolean,
  onToggle?: OnChangeCb,
|}

type State = SwitchBaseChildrenProps

const SwitchContext = React.createContext({})

export default class SwitchBase extends React.Component<Props, State> {
  static Consumer = SwitchContext.Consumer

  static defaultProps = {
    defaultOn: false,
  }

  state: State = {
    on: this.props.defaultOn,
    toggle: this.toggle,
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlled() {
    return typeof this.props.on !== 'undefined'
  }

  getState = (state: State) => ({
    on: this.isControlled ? !!this.props.on : state.on,
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
