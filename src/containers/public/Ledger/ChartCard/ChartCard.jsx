// @flow strict-local
import React from 'react'
import cx from 'classnames'
import OverviewPieChart, { type CategoryCb } from 'components/OverviewPieChart'
import Paper from 'components/kit/Paper'
import type { BarData, BarZoomInCb } from 'components/Charts/Bar'
import type { GroupedPieData } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import TimelineChart from 'components/common/TimelineChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'
import CurrentCategory from './CurrentCategory'

export type Props = {|
  ...InjectStylesProps,
  //
  barsAreClickable: boolean,
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  categoryType: string,
  onBarsZoomIn: BarZoomInCb,
  onCategoryClick?: CategoryCb,
  onCategoryTypeChange?: CategoryCb,
  period: string,
  pieData: GroupedPieData,
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
      barsColor,
      barsAreClickable,
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
    const categories = pieData[categoryType]
    const handleBarsZoomIn = barsAreClickable ? onBarsZoomIn : null

    const barchartProps = {
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
        <Title className={classes.header}>{period}</Title>
        {barsOnly ? (
          <>
            <CurrentCategory className={classes.category} />
            <TimelineChart {...barchartProps} />
          </>
        ) : (
          <>
            <OverviewPieChart
              categoryType={categoryType}
              CategoryList={<LedgerCategoryList />}
              className={classes.overview}
              chartSize={260}
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
