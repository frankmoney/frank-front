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
import { formatCurrency, Paper } from '@frankmoney/components'
import Circle from './Circle.svg'

const PRIMARY_BAR_COLOR = '#484DE7'
const POSITIVE_BAR_COLOR = '#21CB61'
const BAR_CORNER_RADIUS = 3
const BAR_WIDTH = 34
const BASE_LINE_OFFSET = 3
const DASH_LINE_COLOR = '#EBEBEB'
const BASE_LINE_COLOR = '#E5E5E5'
const LEGEND_COLOR = '#808080'

const DEFAULT_VALUE_PROP = 'value'
const NEGATIVE_VALUE_PROP = 'negativeValue'

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
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  circle: {
    position: 'relative',
    top: 1,
  },
  tooltipItemText: {
    margin: [0, 16, 0, 10],
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

const formatMoney = R.pipe(
  x => ({ value: x, precision: 2 }),
  formatCurrency,
  R.replace('$', '$ '),
  R.replace('– ', '−')
)

const TooltipLine = injectStyles(styles)(
  ({ caption, classes, dataKey, fill, value }) => (
    <div className={classes.tooltipItem} style={{ color: fill }}>
      <div>
        <Circle className={classes.circle} />
        <span className={classes.tooltipItemText}>
          {caption || (dataKey === NEGATIVE_VALUE_PROP ? 'Spending' : 'Income')}
        </span>
      </div>
      {/* <Currency value={value} precision={2} /> */}
      {formatMoney(value)}
    </div>
  )
)

export const Tooltip = injectStyles(styles)(
  ({ caption, classes, label, payload, ...otherProps }) => (
    <Paper className={classes.tooltip} {...otherProps}>
      <div className={classes.tooltipHeader}>{label}</div>
      {R.map(x => {
        console.log(x)
        return <TooltipLine caption={caption} {...x} />
      })(payload)}
    </Paper>
  )
)

const fixNegative = R.over(R.lensProp('negativeValue'), R.negate)

const BarChart = ({
  barColor,
  barWidth,
  caption,
  classes,
  className,
  data,
  dual,
  height,
  positiveBarColor,
  width,
}) => {
  const w = width - 48 // Bar padding adjusted for bar spacing. Needs testing on different bar counts
  const signedData = dual ? R.map(fixNegative, data) : data
  return (
    <div className={cx(classes.root, className)} style={{ width, height }}>
      <Grid width={width} step={50} height={height} />
      <Chart
        className={classes.chart}
        stackOffset={dual ? 'sign' : 'none'}
        data={signedData}
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
          content={<Tooltip caption={caption} />}
          isAnimationActive={false}
          cursor={false}
        />
        <Bar
          shape={<Rectangle radius={BAR_CORNER_RADIUS} />}
          type="monotone"
          dataKey={DEFAULT_VALUE_PROP}
          stackId="posNeg"
          fill={dual ? positiveBarColor : barColor}
        />
        {dual && (
          <Bar
            shape={<Rectangle radius={BAR_CORNER_RADIUS} />}
            type="monotone"
            dataKey={NEGATIVE_VALUE_PROP}
            stackId="posNeg"
            fill={barColor}
          />
        )}
      </Chart>
    </div>
  )
}

BarChart.propTypes = {
  barColor: PropTypes.string,
  barWidth: PropTypes.number,
  caption: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  dual: PropTypes.bool,
  height: PropTypes.number,
  positiveBarColor: PropTypes.string,
  width: PropTypes.number,
}

BarChart.defaultProps = {
  barColor: PRIMARY_BAR_COLOR,
  barWidth: BAR_WIDTH,
  height: HEIGHT,
  positiveBarColor: POSITIVE_BAR_COLOR,
  width: WIDTH,
}

export default injectStyles(styles)(BarChart)
