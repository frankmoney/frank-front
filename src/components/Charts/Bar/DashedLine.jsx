// @flow
import React from 'react'

type Props = {| y: number, width: number |}

const DashedLine = ({ y, width }: Props) => (
  <line
    x1="0"
    x2={width}
    y1={y}
    y2={y}
    stroke="#EBEBEB"
    strokeWidth={1}
    strokeDasharray="2"
  />
)

export default DashedLine
