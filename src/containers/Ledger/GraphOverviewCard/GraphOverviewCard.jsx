import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import BarChart from './BarChart'
import ExpandRow from './ExpandRow'
import PieChart from './PieChart'
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
    const {
      classes,
      className,
      pieData,
      onCategoryClick,
      barsData,
      barsOnly,
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
        <Title className={classes.header}>All time</Title>
        {barsOnly ? (
          <BarChart className={classes.barChart} data={barsData} />
        ) : (
          <>
            <PieChart onCategoryClick={onCategoryClick} categories={pieData} />
            <ExpandRow
              className={classes.bottomRow}
              expanded={expanded}
              title="Timeline"
              onToggle={this.handleToggleExpand}
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
