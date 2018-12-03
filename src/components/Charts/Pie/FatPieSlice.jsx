// @flow strict-local
import React from 'react'
import { Cell } from 'recharts'

type Props = {|
  active: boolean,
  color: string,
  index: number,
|}

const FatPieSlice = ({ color, active, index }: Props) => (
  <Cell fill={active ? color : 'none'} key={index} />
)

FatPieSlice.defaultProps = {
  color: '#B3B3B3',
}

export default FatPieSlice
