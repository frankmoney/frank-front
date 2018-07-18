import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
  Bar,
  BarChart as Chart,
  Rectangle,
  Tooltip as TooltipRoot,
  XAxis,
} from 'recharts'
import { injectStyles } from '@frankmoney/ui'
import { Currency, Paper } from '@frankmoney/components'

const BAR_COLOR = '#484DE7'
const BAR_CORNER_RADIUS = 3
const BAR_WIDTH = 34
const BASE_LINE_OFFSET = 3
const DASH_LINE_COLOR = '#EBEBEB'
const BASE_LINE_COLOR = '#E5E5E5'
const LEGEND_COLOR = '#808080'

const WIDTH = 790
const HEIGHT = 260

const styles = theme => ({
  root: {
    position: 'relative',
  },
  chart: {
    margin: '0 auto',
  },
  grid: {
    position: 'absolute',
  },
  tooltip: {
    padding: [14, 19, 9],
    border: '1px solid rgba(0, 0, 0, 0.02)',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  tooltipHeader: {
    ...theme.fontRegular(14, 22),
    color: '#999999',
    marginBottom: 12,
  },
  tooltipItem: {
    ...theme.fontMedium(14, 16),
    marginBottom: 10,
  },
})

const Grid = injectStyles(styles)(
  ({ classes, className, step, height, width, skipZero = true }) => {
    const baseLine = height - 60
    const dashedLines = []
    const firstY = baseLine - (skipZero ? step : 0)
    for (let y = firstY; y >= 0; y -= step) {
      dashedLines.push(
        <line
          x1="0"
          x2={width}
          y1={y}
          y2={y}
          stroke={DASH_LINE_COLOR}
          strokeDasharray="2"
        />
      )
    }
    return (
      <svg
        width={width}
        height={height}
        className={cx(classes.grid, className)}
      >
        {dashedLines}
        <line
          x1="0"
          x2={width}
          y1={baseLine}
          y2={baseLine}
          stroke={BASE_LINE_COLOR}
        />
      </svg>
    )
  }
)

export const Tooltip = injectStyles(styles)(
  ({ color = BAR_COLOR, classes, label, payload, ...otherProps }) => (
    <Paper className={classes.tooltip} {...otherProps}>
      <div className={classes.tooltipHeader}>{label}</div>
      {R.map(item => (
        // TODO: dot, label, style number formatter
        <div className={classes.tooltipItem} style={{ color }}>
          <Currency value={item.value} precision={2} />
        </div>
      ))(payload)}
    </Paper>
  )
)

const BarChart = ({
  barColor,
  barWidth,
  classes,
  className,
  data,
  height,
  width,
}) => {
  const w = width - 48 // Bar padding adjusted for bar spacing. Needs testing on different bar counts
  return (
    <div className={cx(classes.root, className)}>
      <Grid width={width} step={50} height={height} />
      <Chart
        className={classes.chart}
        data={data}
        width={w}
        height={height}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barSize={barWidth}
      >
        <XAxis
          dataKey="key"
          axisLine={false}
          tickLine={false}
          tickMargin={35 + BASE_LINE_OFFSET}
          height={60 + BASE_LINE_OFFSET}
          tick={{ fontSize: 12, fill: LEGEND_COLOR }}
        />
        <TooltipRoot
          content={<Tooltip color={barColor} />}
          isAnimationActive={false}
          cursor={false}
        />
        <Bar
          shape={<Rectangle radius={BAR_CORNER_RADIUS} />}
          type="monotone"
          dataKey="value"
          fill={barColor}
        />
      </Chart>
    </div>
  )
}

BarChart.propTypes = {
  barColor: PropTypes.string,
  barWidth: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  height: PropTypes.number,
  width: PropTypes.number,
}

BarChart.defaultProps = {
  barColor: BAR_COLOR,
  barWidth: BAR_WIDTH,
  height: HEIGHT,
  width: WIDTH,
}

export default injectStyles(styles)(BarChart)
