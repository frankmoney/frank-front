import React, { createFactory } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

// TODO replace with contextType feature in React 16.6
const mapContextToProps = Context => Component => {
  const factory = createFactory(Component)

  class MapContextContextToProps extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {contextValue => factory({ ...this.props, ...contextValue })}
        </Context.Consumer>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Component, 'mapContextToProps'))(
      MapContextContextToProps
    )
  }

  return MapContextContextToProps
}

export default mapContextToProps
