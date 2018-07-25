/* eslint-disable global-require */
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import BarChart from 'components/Charts/Bar'
import ExpandRow from './ExpandRow'
import PieChart from './PieChart'
import Title from './Title'
import styles from './GraphOverviewCard.jss'
import { categoricalData, dualData } from './demoData'

class GraphOverviewCard extends React.PureComponent {
  state = {
    expanded: false,
  }

  handleToggleExpand = expanded => {
    this.setState({ expanded })
  }

  render() {
    const { classes, className } = this.props

    const { expanded } = this.state

    return (
      <Paper
        className={cx(
          classes.root,
          expanded && classes.cardExpanded,
          className
        )}
      >
        <Title className={classes.header}>All time</Title>
        <PieChart categories={categoricalData} />
        <ExpandRow
          className={classes.bottomRow}
          expanded={expanded}
          title="Timeline"
          onToggle={this.handleToggleExpand}
        >
          <BarChart className={classes.barChart} dual data={dualData} />
        </ExpandRow>
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(GraphOverviewCard)
