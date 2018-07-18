/* eslint-disable global-require */
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import ExpandRow from './ExpandRow'
import GraphPie from './GraphPie'
import Title from './Title'
import styles from './GraphOverviewCard.jss'

const DEMO_CATEGORIES = [
  { color: '#8725FB', name: 'Operational expenses' },
  { color: '#21CB61', name: 'Marketing' },
  { color: '#0624FB', name: 'Program expenses' },
  { color: '#FC1891', name: 'Street outreach' },
  { color: '#B3B3B3', name: 'Other categories' },
]

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
          classes.card,
          expanded && classes.cardExpanded,
          className
        )}
      >
        <Title className={classes.timeRange}>All time</Title>
        <GraphPie
          className={classes.graphPieChart}
          categories={DEMO_CATEGORIES}
        />
        <ExpandRow
          className={classes.bottomRow}
          expanded={expanded}
          title="Timeline"
          onToggle={this.handleToggleExpand}
        >
          <img
            alt="demo example"
            src={require('./demo_blurry_double_barchart.png')}
            className={classes.graphBarChart}
          />
        </ExpandRow>
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(GraphOverviewCard)
