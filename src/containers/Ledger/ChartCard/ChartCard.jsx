import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import CategoryListPieChart, {
  dataPropShape as pieDataShape,
} from 'components/CategoryListPieChart'
import BarChart, { barDataShape } from './BarChart'
import ExpandRow from './ExpandRow'
import Title from './Title'
import styles from './ChartCard.jss'

class ChartCard extends React.PureComponent {
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

ChartCard.propTypes = {
  barsData: barDataShape,
  barsOnly: PropTypes.bool,
  categoryType: PropTypes.string,
  onCategoryClick: PropTypes.func,
  onCategoryTypeChange: PropTypes.func,
  period: PropTypes.string.isRequired,
  pieData: pieDataShape,
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
