import React, { createFactory } from 'react'
import EventListener from 'react-event-listener'
import { debounce } from 'lodash'
import { setDisplayName, wrapDisplayName } from 'recompose'

const calcScreenSize = (options = { debounce: 100 }) => Component => {
  const factory = createFactory(Component)

  class CalcScreenSize extends React.Component {
    state = {
      screenHeight: this.currentScreenHeight,
      screenWidth: this.currentScreenWidth,
    }

    get currentScreenHeight() {
      return window.innerHeight
    }

    get currentScreenWidth() {
      return window.innerWidth
    }

    handleResize = debounce(() => {
      this.setState({
        screenHeight: this.currentScreenHeight,
        screenWidth: this.currentScreenWidth,
      })
    }, options.debounce)

    render() {
      return (
        <EventListener target="window" onResize={this.handleResize}>
          {factory({ ...this.props, ...this.state })}
        </EventListener>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Component, 'calcScreenSize'))(
      CalcScreenSize
    )
  }

  return CalcScreenSize
}

export default calcScreenSize
