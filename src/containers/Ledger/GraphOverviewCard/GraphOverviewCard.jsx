/* eslint-disable global-require */
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import ExpandRow from './ExpandRow'
import PieChart from './PieChart'
import Title from './Title'
import styles from './GraphOverviewCard.jss'

const DEMO_CATEGORIES = [
  { color: '#8725FB', name: 'Operational expenses', value: 36 },
  { color: '#21CB61', name: 'Marketing', value: 25 },
  { color: '#0624FB', name: 'Program expenses', value: 12 },
  { color: '#FC1891', name: 'Street outreach', value: 7 },
  { color: '#FF9C28', name: 'Advertising', value: 2 },
  { color: '#00DCEA', name: 'Sales', value: 2 },
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
          classes.root,
          expanded && classes.cardExpanded,
          className
        )}
      >
        <Title className={classes.header}>All time</Title>
        <PieChart categories={DEMO_CATEGORIES} />
        <ExpandRow
          className={classes.bottomRow}
          expanded={expanded}
          title="Timeline"
          onToggle={this.handleToggleExpand}
        >
          <img
            alt="demo example"
            src={require('./demo_blurry_double_barchart.png')}
            className={classes.barChart}
          />
        </ExpandRow>
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(GraphOverviewCard)
