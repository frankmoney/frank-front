// @flow strict-local
import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { Cell, PieChart as ReChart, Pie as RePie } from 'recharts'
import { injectStyles } from '@frankmoney/ui'
import type { Props, PieSliceProps, FatPieSliceProps } from './Pie.flow'

const DEFAULT_COLOR = '#B3B3B3'
const INNER_RING_THICCNESS = 15
const RING_THICCNESS = 5
const SEGMENTS_PADDING_ANGLE = 0.25
const SIZE = 350

const styles = {
  ring: {
    cursor: 'pointer',
  },
  innerRing: {
    opacity: 0.1,
  },
}

const PieSlice = ({ color = DEFAULT_COLOR, index }: PieSliceProps) => (
  <Cell fill={color} key={index} />
)

const FatPieSlice = ({
  color = DEFAULT_COLOR,
  active,
  index,
}: FatPieSliceProps) => <Cell fill={active ? color : 'none'} key={index} />

const injectActive = current => item =>
  R.assoc('active', current === null || R.propEq('index', current, item), item)

const Pie = ({
  activeSegmentIndex,
  classes,
  className,
  data,
  // onClick,
  onSegmentMouseEnter,
  onSegmentMouseLeave,
  size,
}: Props) => {
  const outerRadius = size / 2
  const innerRadius = outerRadius - RING_THICCNESS

  const handlePieEnter =
    onSegmentMouseEnter && (({ index }) => onSegmentMouseEnter(index))

  return (
    <div className={className}>
      <ReChart
        height={size}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        width={size}
        // onClick={onClick}
      >
        <RePie
          className={classes.ring}
          data={data}
          dataKey="value"
          endAngle={-630}
          innerRadius={innerRadius}
          isAnimationActive={false}
          nameKey="name"
          outerRadius={outerRadius}
          paddingAngle={SEGMENTS_PADDING_ANGLE}
          startAngle={-270}
        >
          {R.map(PieSlice, data)}
        </RePie>
        <RePie
          className={cx(classes.ring, classes.innerRing)}
          data={data}
          dataKey="value"
          endAngle={-630}
          innerRadius={innerRadius - INNER_RING_THICCNESS}
          isAnimationActive={false}
          nameKey="name"
          outerRadius={outerRadius}
          paddingAngle={SEGMENTS_PADDING_ANGLE}
          startAngle={-270}
        >
          {R.map(
            R.pipe(
              injectActive(activeSegmentIndex),
              FatPieSlice
            ),
            data
          )}
        </RePie>
        <RePie
          data={data}
          dataKey="value"
          endAngle={-630}
          innerRadius={0}
          onMouseEnter={handlePieEnter}
          onMouseLeave={onSegmentMouseLeave}
          opacity={0}
          outerRadius={outerRadius}
          paddingAngle={SEGMENTS_PADDING_ANGLE}
          startAngle={-270}
        />
      </ReChart>
    </div>
  )
}

Pie.defaultProps = {
  size: SIZE,
}

export default injectStyles(styles)(Pie)
