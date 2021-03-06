// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import {
  Bar,
  BarChart as Chart,
  Rectangle,
  Tooltip as ReTooltip,
  XAxis,
} from 'recharts'
import type { BarData, FormattedBarLabels } from 'data/models/barData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import AxisLabel from './AxisLabel'
import Grid from './Grid'
import Tooltip from './Tooltip'
import { EPSILON, type TooltipLabelFormatter } from './TooltipLine'

const BAR_CORNER_RADIUS = 3
const BASE_LINE_OFFSET = 3
const DEFAULT_VALUE_PROP = 'value'
const FOOTER_PADDING = 20
const FOOTER_TEXT_HEIGHT = 31
const NEGATIVE_VALUE_PROP = 'negativeValue'
const PADDING = 20
export const POSITIVE_BAR_COLOR = '#21CB61'
export const PRIMARY_BAR_COLOR = '#484DE7'

const HEIGHT = 260

const styles = {
  root: {
    position: 'relative',
  },
  chart: {
    margin: '0 auto',
  },
  clickableBar: {
    cursor: 'pointer',
  },
  positiveBars: {
    transform: `translateY(-${BASE_LINE_OFFSET}px)`,
  },
  negativeBars: {
    transform: `translateY(${BASE_LINE_OFFSET}px)`,
  },
}

type BarItemDates = {|
  dateFrom: string,
  dateTo: string,
|}

export type BarZoomInCb = BarItemDates => void

type Props = {|
  ...InjectStylesProps,
  //
  barColor: string,
  data: BarData,
  dual?: boolean,
  footerPadding: number,
  forcedTooltipLabel?: string,
  height: number,
  hideBaseLine?: boolean,
  labelKey: string,
  mobile?: boolean,
  onZoomIn?: BarZoomInCb,
  positiveBarColor: string,
  showBars: boolean,
  width: number,
|}

const negateWithEpsilon = x => (x === 0 ? -EPSILON : -x)
const fixNegative = R.over(R.lensProp(NEGATIVE_VALUE_PROP), negateWithEpsilon)

const tooltipLabelFormatter = (
  forcedLabel: ?string
): TooltipLabelFormatter => payload =>
  forcedLabel ||
  (payload.dataKey === NEGATIVE_VALUE_PROP ? 'Spending' : 'Income')

class BarChart extends React.PureComponent<Props> {
  static defaultProps = {
    barColor: PRIMARY_BAR_COLOR,
    footerPadding: FOOTER_PADDING,
    height: HEIGHT,
    labelKey: 'name',
    positiveBarColor: POSITIVE_BAR_COLOR,
    showBars: true,
    width: 790,
  }

  handleBarClick = ({ date }) => {
    const onZoomIn = this.props.onZoomIn
    if (typeof onZoomIn === 'function') {
      const barLabels: FormattedBarLabels = JSON.parse(date)
      onZoomIn({
        dateFrom: barLabels.startDate,
        dateTo: barLabels.endDate,
      })
    }
  }

  render() {
    const {
      barColor,
      classes,
      className,
      data,
      dual,
      footerPadding,
      forcedTooltipLabel,
      height,
      hideBaseLine,
      labelKey,
      mobile,
      onZoomIn,
      positiveBarColor,
      showBars,
      width,
    } = this.props
    const signedData = dual ? R.map(fixNegative, data) : data
    const barCount = R.length(data)
    const barWidth = (width - 2 * PADDING) / (2 * barCount - 1)
    // const w = barWidth * (2 * barCount)
    const w = width // ^^ There was a reason for that, but it seems just width is working for now
    const footerHeight = footerPadding + FOOTER_TEXT_HEIGHT
    const clickable = typeof onZoomIn === 'function'

    return (
      <div className={cx(classes.root, className)} style={{ width, height }}>
        <Grid
          dual={dual}
          width={width}
          steps={dual ? 2 : 4}
          height={height - footerHeight}
          hideBaseLine={hideBaseLine}
        />
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
            axisLine={false}
            dataKey={labelKey}
            height={footerHeight + BASE_LINE_OFFSET}
            interval={0}
            minTickGap={0}
            padding={{ left: 0, right: 0 }}
            tick={<AxisLabel />}
            tickLine={false}
            tickMargin={footerPadding}
            tickSize={4}
          />
          {!mobile && (
            <ReTooltip
              content={
                <Tooltip
                  labelFormatter={tooltipLabelFormatter(forcedTooltipLabel)}
                />
              }
              isAnimationActive={false}
              cursor={false}
            />
          )}
          {showBars && (
            <Bar
              className={cx({
                [classes.clickableBar]: clickable,
                [classes.positiveBars]: dual,
              })}
              dataKey={DEFAULT_VALUE_PROP}
              fill={dual ? positiveBarColor : barColor}
              minPointSize={5}
              shape={<Rectangle radius={BAR_CORNER_RADIUS} />}
              stackId="posNeg"
              type="monotone"
              onClick={this.handleBarClick}
            />
          )}
          {showBars &&
            dual && (
              <Bar
                className={cx({
                  [classes.clickableBar]: clickable,
                  [classes.negativeBars]: dual,
                })}
                dataKey={NEGATIVE_VALUE_PROP}
                fill={barColor}
                minPointSize={5}
                shape={<Rectangle radius={BAR_CORNER_RADIUS} />}
                stackId="posNeg"
                type="monotone"
                onClick={this.handleBarClick}
              />
            )}
        </Chart>
      </div>
    )
  }
}

export default injectStyles(styles)(BarChart)
