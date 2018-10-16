// @flow
import React from 'react'
import * as R from 'ramda'

const LEGEND_COLOR = '#808080'
const LEGEND_SECOND_COLOR = '#B3B3B3'

type Props = {
  payload: { value: string },
  x: number,
  y: number,
}

const Tick = ({ payload: { value }, x, y }: Props) => {
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

export default Tick
