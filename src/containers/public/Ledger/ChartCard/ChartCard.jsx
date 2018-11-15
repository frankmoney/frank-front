// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import CategoryListPieChart from 'components/CategoryListPieChart'
import BarChart from './BarChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'
import type { Props, State } from './ChartCard.flow'

class ChartCard extends React.PureComponent<Props, State> {
  state = {
    expanded: true,
  }

  handleToggleExpand = expanded => {
    this.setState({ expanded })
  }

  render() {
    const {
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
          <BarChart className={classes.barChart} data={barsData} />
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
              <BarChart className={classes.barChart} data={barsData} />
            </ExpandRow>
          </>
        )}
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
