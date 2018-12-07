// @flow strict-local
import React from 'react'
import cx from 'classnames'
import type { BarData, BarZoomInCb } from 'components/Charts/Bar'
import OverviewPieChart, {
  type OverviewPieChartProps,
  type PieChartCategories,
} from 'components/OverviewPieChart'
import Paper from 'components/kit/Paper'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import TimelineChart from 'components/common/TimelineChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'

type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  //
  barsAreClickable: boolean,
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  period: string,
  pieItems: PieChartCategories,
  // Handlers
  onBarsZoomIn: BarZoomInCb,
|}

type State = {|
  expanded: boolean,
|}

class ChartCard extends React.PureComponent<Props, State> {
  state = {
    expanded: true,
  }

  handleToggleExpand = expanded => {
    this.setState({ expanded })
  }

  render() {
    const {
      barsAreClickable,
      barsColor,
      barsData,
      barsOnly,
      classes,
      className,
      onBarsZoomIn,
      onCategoryClick,
      onPieTotalChange,
      period,
      pieItems,
      pieTotal,
      pieTotalSelectable,
    } = this.props

    const { expanded } = this.state
    const handleBarsZoomIn = barsAreClickable ? onBarsZoomIn : null

    const barchartProps = {
      barsColor,
      className: classes.barChart,
      data: barsData,
      onZoomIn: handleBarsZoomIn,
      width: 790,
    }

    return (
      <Paper
        className={cx(
          classes.root,
          expanded && classes.cardExpanded,
          className
        )}
      >
        <Title className={classes.header}>{period}</Title>
        {barsOnly ? (
          <TimelineChart {...barchartProps} />
        ) : (
          <>
            <OverviewPieChart
              CategoryList={<LedgerCategoryList />}
              chartClassName={classes.chart}
              chartSize={350}
              data={pieItems}
              onCategoryClick={onCategoryClick}
              onPieTotalChange={onPieTotalChange}
              pieTotal={pieTotal}
              pieTotalSelectable={pieTotalSelectable}
            />
            <ExpandRow
              className={classes.bottomRow}
              expanded={expanded}
              onToggle={this.handleToggleExpand}
              title="Timeline"
            >
              <TimelineChart {...barchartProps} />
            </ExpandRow>
          </>
        )}
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
