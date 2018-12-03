// @flow strict-local
import React from 'react'
import { Cell } from 'recharts'

type Props = {|
  color: string,
  index: number,
|}

const PieSlice = ({ color, index }: Props) => <Cell fill={color} key={index} />

PieSlice.defaultProps = {
  color: '#B3B3B3',
}

export default PieSlice
