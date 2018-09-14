import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import PieChart, { dataPropShape } from 'containers/PieChart'

const styles = theme => ({
  root: {
    overflowY: 'scroll',
    margin: [0, -15, -19, 0],
    padding: [5, 15, 19, 0],
    display: 'block',
    width: 'unset',
    height: 'unset',
  },
  periodSelect: {
    display: 'inline-block',
    position: 'relative',
    top: 'unset',
    left: 2,
  },
  switcherContainer: {
    display: 'inline-block',
    height: 'auto',
    width: 'auto',
    marginLeft: 29,
  },
  switcher: {
    position: 'unset',
    transform: 'none',
  },
  legend: {
    padding: [10, 2],
    width: '100%',
    minHeight: 128, // fixes case of too few lines
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    padding: [4, 0],
    position: 'relative',
  },
  legendItemFont: {
    ...theme.fontMedium(18, 26),
  },
  legendItemValue: {
    position: 'absolute',
    right: 0,
    ...theme.fontRegular(18, 26),
  },
  legendIcon: {
    height: 14,
    width: 14,
  },
})

const LegendOnly = ({
  categoryType,
  classes,
  className,
  data,
  onCategoryClick,
  onCategoryTypeChange,
  onPeriodChange,
  period,
  periods,
}) => (
  <PieChart
    categoryLimit={999}
    categoryType={categoryType}
    chartClassName={classes.switcherContainer}
    className={cx(classes.root, className)}
    data={data}
    hideChart
    legendClassName={classes.legend}
    legendIconClassName={classes.legendIcon}
    legendItemClassName={classes.legendItem}
    legendNameClassName={classes.legendItemFont}
    legendValueClassName={classes.legendItemValue}
    onCategoryClick={onCategoryClick}
    onCategoryTypeChange={onCategoryTypeChange}
    onPeriodChange={onPeriodChange}
    period={period}
    periods={periods}
    periodSelectClassName={classes.periodSelect}
    switcherClassName={classes.switcher}
  />
)

LegendOnly.propTypes = {
  categoryType: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: dataPropShape.isRequired,
}

export default injectStyles(styles)(LegendOnly)
