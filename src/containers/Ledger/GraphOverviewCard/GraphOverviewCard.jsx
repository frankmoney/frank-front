import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import BarChart from 'containers/BarChart'
import PieChart from 'containers/PieChart'
import ExpandRow from './ExpandRow'
import Title from './Title'
import styles from './GraphOverviewCard.jss'

const period = 'All time'

class GraphOverviewCard extends React.PureComponent {
  state = {
    expanded: true,
  }

  handleToggleExpand = expanded => {
    this.setState({ expanded })
  }

  render() {
    const { classes, className, pieChartData, barChartData } = this.props

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
        <PieChart
          categories={pieChartData}
          chartClassName={classes.chart}
          hidePeriod
          legendClassName={classes.legend}
          period={period}
        />
        <ExpandRow
          className={classes.bottomRow}
          expanded={expanded}
          title="Timeline"
          onToggle={this.handleToggleExpand}
        >
          <BarChart className={classes.barChart} data={barChartData} />
        </ExpandRow>
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(GraphOverviewCard)
