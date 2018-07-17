import React from 'react'
import cx from 'classnames'
import {
  BarChart as Chart,
  Bar,
  Tooltip,
  XAxis,
  CartesianGrid,
  Rectangle,
  Label,
} from 'recharts'
// import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'

const BAR_WIDTH = 34
const BAR_COLOR = '#484DE7'
const WIDTH = 790
const HEIGHT = 260
const GRID_COLOR = '#EBEBEB'

const styles = theme => ({
  axisLabel: {
    ...theme.fontRegular(12, 20),
  },
})

// const BarShape = props => <rect rx="3" ry="3" {...props} />

const BarChart = ({ classes, className, data, barColor, width, height }) => {
  const gridValues = [50, 100, 150, 200]
  return (
    <div className={cx(classes.root, className)}>
      <Chart
        data={data}
        width={width || WIDTH}
        height={height || HEIGHT}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barSize={BAR_WIDTH}
      >
        <CartesianGrid
          vertical={false}
          // verticalPoints={gridValues}
          stroke={GRID_COLOR}
          strokeDasharray="2"
        />
        <XAxis
          dataKey="key"
          tickLine={false}
          tickMargin={40}
          height={40 + 20}
          className={classes.axisLabel}
        />
        <Tooltip isAnimationActive={false} cursor={false} />
        <Bar
          x={44}
          shape={<Rectangle radius={3} />}
          type="monotone"
          dataKey="value"
          fill={barColor || BAR_COLOR}
        />
      </Chart>
    </div>
  )
}
BarChart.propTypes = {}

export default injectStyles(styles)(BarChart)
