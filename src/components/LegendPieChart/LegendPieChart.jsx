import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { pieChartDataShape } from 'components/Charts/shapes'
import CategoryList from 'components/CategoryList'
import DropdownSwitcher from 'components/DropdownSwitcher'
import Pie from 'components/Charts/Pie'
import { limitCategoriesTo, DEFAULT_LIMIT } from 'utils/limitCategories'
import PeriodSelector from './PeriodSelector'
import styles from './LegendPieChart.jss'

const CATEGORY_TYPES = [{ key: 'income' }, { key: 'spending' }]

const roundValues = R.over(R.lensProp('value'), Math.round)

class LegendPieChart extends React.PureComponent {
  state = {
    activeKey: null,
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const {
      categoryLimit,
      categoryType,
      chartClassName,
      chartSize,
      classes,
      className,
      data,
      hideChart,
      hidePeriod,
      legendClassName,
      legendIconClassName,
      legendItemClassName,
      legendNameClassName,
      legendValueClassName,
      onCategoryClick,
      onCategoryTypeChange,
      onPeriodChange,
      period,
      periods,
      periodSelectClassName,
      switcherClassName,
      switcherLabel,
    } = this.props

    const handleChangeCategoryType =
      onCategoryTypeChange &&
      (event => onCategoryTypeChange(event.target.value))

    const categories = data[categoryType] // TODO: use selector
    const { items, other, tooltipItems } = limitCategoriesTo(categoryLimit)(
      categories
    )
    const limitedCategories = {
      items: R.map(roundValues, items),
      other: other && roundValues(other),
      tooltipItems: R.map(roundValues, tooltipItems),
    }
    const pieData = other ? R.append(other, items) : items

    const handleCategoryClick =
      onCategoryClick && (key => onCategoryClick(items[key]))

    return (
      <div
        className={cx(
          classes.root,
          hidePeriod && classes.hiddenPeriod,
          className
        )}
      >
        {!hidePeriod && (
          <PeriodSelector
            className={cx(classes.periodSelect, periodSelectClassName)}
            onChange={onPeriodChange}
            value={period}
            values={periods}
          />
        )}
        <div className={cx(classes.chartContainer, chartClassName)}>
          {!hideChart && (
            <Pie
              activeKey={this.state.activeKey}
              className={classes.chart}
              data={pieData}
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOut}
              size={chartSize}
            />
          )}
          <DropdownSwitcher
            className={cx(classes.switcher, switcherClassName)}
            label={switcherLabel}
            onChange={handleChangeCategoryType}
            value={categoryType}
            values={CATEGORY_TYPES}
          />
        </div>
        <CategoryList
          activeKey={this.state.activeKey}
          activeLabelClassName={classes.activeLegendItem}
          className={cx(classes.legend, legendClassName, {
            [classes.highlightedLegend]: this.state.activeKey !== null,
          })}
          iconClassName={cx(classes.legendIcon, legendIconClassName)}
          itemClassName={cx(classes.legendItem, legendItemClassName)}
          limitedCategories={limitedCategories}
          nameClassName={cx(classes.legendItemName, legendNameClassName)}
          onLabelClick={handleCategoryClick}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueClassName={cx(classes.legendItemValue, legendValueClassName)}
          valueUnit="%"
        />
      </div>
    )
  }
}

export const dataPropShape = PropTypes.objectOf(
  PropTypes.arrayOf(pieChartDataShape)
)

LegendPieChart.propTypes = {
  categoryLimit: PropTypes.number.isRequired,
  categoryType: PropTypes.string.isRequired,
  chartSize: PropTypes.number.isRequired,
  data: dataPropShape,
  hideChart: PropTypes.bool,
  hidePeriod: PropTypes.bool,
  legendClassName: PropTypes.string,
  legendIconClassName: PropTypes.string,
  legendItemClassName: PropTypes.string,
  legendNameClassName: PropTypes.string,
  legendValueClassName: PropTypes.string,
  onCategoryClick: PropTypes.func, // category object in callback
  onCategoryTypeChange: PropTypes.func,
  onPeriodChange: PropTypes.func,
  period: PropTypes.string,
  periods: PropTypes.arrayOf(PropTypes.string),
  switcherClassName: PropTypes.string,
  switcherLabel: PropTypes.string,
}

LegendPieChart.defaultProps = {
  categoryLimit: DEFAULT_LIMIT,
  chartSize: 350,
  switcherLabel: '% of total',
}

export default injectStyles(styles)(LegendPieChart)
