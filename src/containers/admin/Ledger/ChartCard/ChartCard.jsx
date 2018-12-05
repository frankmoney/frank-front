// @flow strict-local
import React from 'react'
import cx from 'classnames'
import OverviewPieChart, {
  type CategoryCb,
  type PieChartCategories,
} from 'components/OverviewPieChart'
import type { BarData, BarZoomInCb } from 'components/Charts/Bar'
import Paper from 'components/kit/Paper'
import type { PieChartCategory } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import TimelineChart from 'components/common/TimelineChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'

// This is identical to GroupedPieData
// Flow or prop types fail to validate with the imported type
type PieData = {|
  income: Array<PieChartCategory>,
  spending: Array<PieChartCategory>,
|}

type Props = {|
  ...InjectStylesProps,
  //
  barsAreClickable: boolean,
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  categoryType: string,
  period: string,
  pieData: PieData,
  // Handlers
  onBarsZoomIn: BarZoomInCb,
  onCategoryClick?: CategoryCb,
  onCategoryTypeChange?: CategoryCb,
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
      categoryType,
      classes,
      className,
      onBarsZoomIn,
      onCategoryClick,
      onCategoryTypeChange,
      period,
      pieData,
    } = this.props

    const { expanded } = this.state
    const categories: PieChartCategories = pieData[categoryType]
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
              categoryType={categoryType}
              CategoryList={<LedgerCategoryList />}
              chartClassName={classes.chart}
              chartSize={350}
              data={categories}
              onCategoryClick={onCategoryClick}
              onCategoryTypeChange={onCategoryTypeChange}
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
