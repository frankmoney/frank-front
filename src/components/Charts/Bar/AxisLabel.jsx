// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import type { FormattedBarLabels, JSONString } from 'data/models/barData'

const LEGEND_COLOR = '#808080'
const LEGEND_SECOND_COLOR = '#B3B3B3'

interface RechartsPayload { value: JSONString }

type Props = {|
  payload: RechartsPayload,
  x: number,
  y: number,
|}

type ContentRenderer<P> = (props: P) => React.Node // from recharts.d.ts

const AxisLabel: ContentRenderer<Props> = ({
  payload: { value },
  x,
  y,
}: Props) => {
  const labels: FormattedBarLabels = JSON.parse(value)
  const [text, secondLine] = R.split(' ', labels.axisLabel)
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

export default AxisLabel
