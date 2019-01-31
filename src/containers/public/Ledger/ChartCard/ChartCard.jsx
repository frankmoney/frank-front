// @flow strict-local
import React from 'react'
import cx from 'classnames'
import OverviewPieChart, {
  type OverviewPieChartProps,
  type PieChartCategories,
} from 'components/OverviewPieChart'
import Paper from 'components/kit/Paper'
import AreaSpinner from 'components/AreaSpinner'
import type { BarData, BarZoomInCb } from 'components/Charts/Bar'
import TimelineChart from 'components/common/TimelineChart'
import { type CategoryType } from 'data/models/category'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'
import CurrentCategory from './CurrentCategory'

export type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  //
  barsAreClickable: boolean,
  barsCategoryType: ?CategoryType,
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  loading?: boolean,
  onBarsZoomIn: BarZoomInCb,
  period: string,
  pieChartVisible: boolean,
  pieItems: PieChartCategories,
|}

export type State = {|
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
      barsCategoryType,
      barsColor,
      barsData,
      barsOnly,
      classes,
      className,
      loading,
      onBarsZoomIn,
      onCategoryClick,
      onPieTotalChange,
      period,
      pieChartVisible,
      pieItems,
      pieTotal,
      pieTotalSelectable,
    } = this.props

    const { expanded } = this.state
    const handleBarsZoomIn = barsAreClickable ? onBarsZoomIn : null

    const barchartProps = {
      barsCategoryType,
      barsColor,
      className: classes.barChart,
      data: barsData,
      onZoomIn: handleBarsZoomIn,
      width: 600,
    }

    return (
      <Paper
        className={cx(
          classes.root,
          expanded && classes.cardExpanded,
          className
        )}
      >
        {loading && <AreaSpinner className={classes.spinner} />}
        {!loading && (
          <>
            <Title className={classes.header}>{period}</Title>
            {barsOnly ? (
              <>
                <CurrentCategory className={classes.category} />
                <TimelineChart {...barchartProps} />
              </>
            ) : pieChartVisible ? (
              <>
                <OverviewPieChart
                  CategoryList={<LedgerCategoryList />}
                  chartClassName={classes.pie}
                  chartSize={260}
                  className={classes.overview}
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
            ) : (
              <TimelineChart {...barchartProps} />
            )}
          </>
        )}
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
