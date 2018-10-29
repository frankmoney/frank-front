// @flow
import * as React from 'react'

type Props = {
  children?: React.Node,
  defaultOn: boolean,
  on?: boolean,
  onToggle: boolean => void,
}

type State = {
  on: boolean,
}

const SwitchContext = React.createContext({})

export default class SwitchBase extends React.Component<Props, State> {
  static Consumer = SwitchContext.Consumer

  static defaultProps = {
    defaultOn: false,
  }

  state = {
    on: this.props.defaultOn,
  }

  // flowlint unsafe-getters-setters:off
  get isControlled() {
    return typeof this.props.on !== 'undefined'
  }

  getState = (state: State = this.state) => ({
    on: this.isControlled ? this.props.on : state.on,
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
    const state = this.getState()

    return (
      <SwitchContext.Provider value={state}>
        {typeof children === 'function' ? children(state) : children}
      </SwitchContext.Provider>
    )
  }
}
