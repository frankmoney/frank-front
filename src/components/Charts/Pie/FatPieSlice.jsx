// @flow strict-local
import React from 'react'
import { Cell } from 'recharts'
import { FILLER } from 'data/models/pieData'

type Props = {|
  active: boolean,
  color: string,
  id: string,
  index: number,
|}

const FatPieSlice = ({ active, color, id, index }: Props) => (
  <Cell
    fill={active ? color : 'none'}
    cursor={id === FILLER.id ? 'default' : 'pointer'}
    key={index}
  />
)

FatPieSlice.defaultProps = {
  color: FILLER.color,
}

export default FatPieSlice
