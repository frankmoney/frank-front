// @flow strict-local
import React from 'react'
import cx from 'classnames'
import CategoryListPieChart from 'components/CategoryListPieChart'
import Paper from 'components/kit/Paper'
import type { CategoryCb } from 'components/CategoryList'
import type { BarData } from 'components/Charts/Bar'
import type { GroupedPieData } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import BarChart from './BarChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'

export type Props = {|
  ...InjectStylesProps,
  //
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  categoryType: string,
  onCategoryClick: ?CategoryCb,
  onCategoryTypeChange: ?CategoryCb,
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
      barsData,
      barsOnly,
      categoryType,
      classes,
      className,
      onCategoryClick,
      onCategoryTypeChange,
      period,
      pieData,
    } = this.props

    const { expanded } = this.state
    const categories = pieData[categoryType]
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
          />
        ) : (
          <>
            <CategoryListPieChart
              categoryType={categoryType}
              CategoryList={LedgerCategoryList}
              chartClassName={classes.chart}
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
              <BarChart
                barsColor={barsColor}
                className={classes.barChart}
                data={barsData}
              />
            </ExpandRow>
          </>
        )}
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
