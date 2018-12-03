// @flow strict-local
import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { PieChart as ReChart, Pie as RePie } from 'recharts'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import FatPieSlice from './FatPieSlice'
import PieSlice from './PieSlice'

const INNER_RING_THICCNESS = 15
const RING_THICCNESS = 5

const styles = {
  ring: {
    cursor: 'pointer',
  },
  innerRing: {
    opacity: 0.1,
  },
}

type SegmentIndex = number

type PieItem = {
  color?: string,
  name: string,
  value: number,
}

export type PieData = Array<PieItem>

type Props = {|
  ...InjectStylesProps,
  //
  activeSegmentIndex?: number,
  data: PieData,
  size: number,
  onSegmentMouseEnter?: SegmentIndex => void,
  onSegmentMouseLeave?: () => void,
|}

const injectActive = current => item =>
  R.assoc('active', current === null || R.propEq('index', current, item), item)

const COMMON_PIE_PROPS = {
  dataKey: 'value',
  endAngle: -630,
  isAnimationActive: false,
  nameKey: 'name',
  paddingAngle: 0.25,
  startAngle: -270,
}

const Pie = ({
  activeSegmentIndex,
  classes,
  className,
  data,
  onSegmentMouseEnter,
  onSegmentMouseLeave,
  size,
}: Props) => {
  const outerRadius = size / 2
  const innerRadius = outerRadius - RING_THICCNESS

  const handlePieEnter =
    onSegmentMouseEnter && (({ index }) => onSegmentMouseEnter(index))

  const pieProps = {
    ...COMMON_PIE_PROPS,
    data,
    outerRadius,
  }

  return (
    <div className={className}>
      <ReChart
        height={size}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        width={size}
      >
        <RePie className={classes.ring} innerRadius={innerRadius} {...pieProps}>
          {R.map(PieSlice, data)}
        </RePie>
        <RePie
          className={cx(classes.ring, classes.innerRing)}
          innerRadius={innerRadius - INNER_RING_THICCNESS}
          {...pieProps}
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
          innerRadius={0}
          onMouseEnter={handlePieEnter}
          onMouseLeave={onSegmentMouseLeave}
          opacity={0}
          {...pieProps}
        />
      </ReChart>
    </div>
  )
}

Pie.defaultProps = {
  size: 350,
}

export default injectStyles(styles)(Pie)
