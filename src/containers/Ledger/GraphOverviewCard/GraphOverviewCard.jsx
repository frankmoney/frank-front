import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import BarChart from 'containers/BarChart'
import PieChart from 'containers/PieChart'
import ExpandRow from './ExpandRow'
import Title from './Title'
import styles from './GraphOverviewCard.jss'

class GraphOverviewCard extends React.PureComponent {
  state = {
    expanded: true,
  }

  handleToggleExpand = expanded => {
    this.setState({ expanded })
  }

  render() {
    const { classes, className, categoricalData, dualData } = this.props

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
          <BarChart className={classes.barChart} data={dualData} />
        </ExpandRow>
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(GraphOverviewCard)
