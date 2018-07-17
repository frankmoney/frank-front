import React from 'react'
import { Bar, BarChart as Chart, Rectangle, Tooltip, XAxis } from 'recharts'

const BAR_WIDTH = 34
const BAR_COLOR = '#484DE7'
const WIDTH = 790
const HEIGHT = 260

const Grid = ({ step, height, width, skipZero = true }) => {
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
        stroke="#EBEBEB"
        strokeDasharray="2"
      />
    )
  }
  return (
    <svg width={width} height={height} style={{ position: 'absolute' }}>
      {dashedLines}
      <line x1="0" x2={width} y1={baseLine} y2={baseLine} stroke="#E5E5E5" />
    </svg>
  )
}

const BarChart = ({ className, data, barColor, width, height }) => {
  const fullWidth = width || WIDTH
  const w = fullWidth - 48 // TODO: why 48?
  const h = height || HEIGHT
  const barSize = BAR_WIDTH
  return (
    <div className={className}>
      <Grid width={fullWidth} step={50} height={h} />
      <Chart
        style={{ margin: '0 auto' }}
        data={data}
        width={w}
        height={h}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barSize={barSize}
      >
        <XAxis
          dataKey="key"
          axisLine={false}
          tickLine={false}
          tickMargin={35}
          height={60 + 3}
          tick={{ fontSize: 12, fill: '#808080' }}
          style={{ transform: 'translateY(3px)' }}
        />
        <Tooltip isAnimationActive={false} cursor={false} />
        <Bar
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

export default BarChart
