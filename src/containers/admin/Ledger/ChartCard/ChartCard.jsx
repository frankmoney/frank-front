// @flow strict-local
import React from 'react'
import cx from 'classnames'
import OverviewPieChart, { type CategoryCb } from 'components/OverviewPieChart'
import type { BarData, BarZoomInCb } from 'components/Charts/Bar'
import Paper from 'components/kit/Paper'
import type { GroupedPieData } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import BarChart from './BarChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'

type Props = {|
  ...InjectStylesProps,
  //
  barsAreClickable: boolean,
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  categoryType: string,
  period: string,
  pieData: GroupedPieData,
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
    const categories = pieData[categoryType]
    const handleBarsZoomIn = barsAreClickable ? onBarsZoomIn : null

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
          <BarChart
            barsColor={barsColor}
            className={classes.barChart}
            data={barsData}
            onZoomIn={handleBarsZoomIn}
          />
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
              <BarChart
                barsColor={barsColor}
                className={classes.barChart}
                data={barsData}
                onZoomIn={handleBarsZoomIn}
              />
            </ExpandRow>
          </>
        )}
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
