import React, { createFactory } from 'react'
import pick from 'lodash/pick'

const preventZeroPaymentsProps = (freezedProps = []) => Component => {
  const factory = createFactory(Component)
  return class WithoutZeroPaymentsProps extends React.Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
      if (props.paymentsCount !== 0) {
        return pick(props, ['paymentsCount', ...freezedProps])
      }
      return state
    }

    render() {
      return factory({
        ...this.props,
        ...this.state,
      })
    }
  }
}

export default preventZeroPaymentsProps
