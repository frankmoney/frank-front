// @flow strict-local
import React from 'react'
import cx from 'classnames'
import CategoryListPieChart from 'components/CategoryListPieChart'
import Paper from 'components/kit/Paper'
import { injectStyles } from 'utils/styles'
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
