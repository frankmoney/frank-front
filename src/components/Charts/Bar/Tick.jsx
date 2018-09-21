import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'

const LEGEND_COLOR = '#808080'
const LEGEND_SECOND_COLOR = '#B3B3B3'

const Tick = ({ payload: { value }, x, y }) => {
  const [text, secondLine] = R.split(' ', value)
  return (
    <>
      <text x={x} y={y} textAnchor="middle" fontSize={12} fill={LEGEND_COLOR}>
        {text}
      </text>
      {secondLine && (
        <text
          x={x}
          y={y + 22}
          textAnchor="middle"
          fontSize={12}
          fill={LEGEND_SECOND_COLOR}
        >
          {secondLine}
        </text>
      )}
    </>
  )
}

Tick.propTypes = {
  payload: PropTypes.shape({ value: PropTypes.any.isRequired }).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Tick
