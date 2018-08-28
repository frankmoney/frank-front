import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import BarChart from 'containers/BarChart'
import PieChart from 'containers/PieChart'
import ExpandRow from './ExpandRow'
import Title from './Title'
import styles from './GraphOverviewCard.jss'

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
      classes,
      className,
      onCategoryClick,
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
            <PieChart
              chartClassName={classes.chart}
              data={pieData}
              hidePeriod
              legendClassName={classes.legend}
              onCategoryClick={onCategoryClick}
              period={period}
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
