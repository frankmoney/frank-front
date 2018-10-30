import React from 'react'
import ArrowSvg from './arrow.svg'

const arrowProps = {
  fill: 'currentColor',
  position: 'absolute',
  top: 0,
  left: 0,
}

class Arrow extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <ArrowSvg style={arrowProps} />
      </div>
    )
  }
}

export default Arrow
