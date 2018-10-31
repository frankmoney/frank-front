// @flow
import React from 'react'
import * as R from 'ramda'
import type { ContentRenderer } from 'recharts'

const LEGEND_COLOR = '#808080'
const LEGEND_SECOND_COLOR = '#B3B3B3'

interface RechartsPayload { value: string }

interface Props {
  payload: RechartsPayload;
  x: number;
  y: number;
}

const Tick: ContentRenderer<Props> = ({ payload: { value }, x, y }: Props) => {
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
