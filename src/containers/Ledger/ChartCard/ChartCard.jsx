import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import LegendPieChart from 'components/LegendPieChart'
import BarChart from './BarChart'
import ExpandRow from './ExpandRow'
import Title from './Title'
import styles from './ChartCard.jss'

const period = 'All time' // TODO: real period

class GraphOverviewCard extends React.PureComponent {
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
      pieData,
    } = this.props

    const { expanded } = this.state
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
            <LegendPieChart
              categoryType={categoryType}
              chartClassName={classes.chart}
              data={pieData}
              hidePeriod
              legendClassName={classes.legend}
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

export default injectStyles(styles, { fixedGrid: true })(GraphOverviewCard)
