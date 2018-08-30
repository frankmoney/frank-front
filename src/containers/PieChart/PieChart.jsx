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
import styles from './PieChart.jss'

export const pieCategoryTypes = [{ key: 'income' }, { key: 'spending' }]

const roundValues = R.over(R.lensProp('value'), Math.round)

class PieChart extends React.PureComponent {
  state = {
    activeKey: null,
    categoryType: 'spending',
    period: this.props.period,
  }

  handleChangeCategoryType = event => {
    this.setState({ categoryType: event.target.value })
  }

  handleChangePeriod = event => {
    this.setState({ period: event.target.value })
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const {
      categoryLimit,
      chartClassName,
      chartSize,
      classes,
      className,
      data,
      entriesCount,
      footer: Footer,
      footerClassName,
      hideChart,
      hidePeriod,
      legendClassName,
      legendIconClassName,
      legendItemClassName,
      legendNameClassName,
      legendValueClassName,
      onCategoryClick,
      periodSelectClassName,
      switcherClassName,
      switcherLabel,
    } = this.props

    const { categoryType, period } = this.state

    const categories = data[categoryType]
    const categoryCount = R.length(categories)
    const { items, other, tooltipItems } = limitCategoriesTo(categoryLimit)(
      categories
    )
    const limitedCategories = {
      items: R.map(roundValues, items),
      other: other && roundValues(other),
      tooltipItems: R.map(roundValues, tooltipItems),
    }
    const pieData = other ? R.append(other, items) : items

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
            onChange={this.handleChangePeriod}
            value={period}
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
            onChange={this.handleChangeCategoryType}
            value={categoryType}
            values={pieCategoryTypes}
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
          onLabelClick={onCategoryClick}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueClassName={cx(classes.legendItemValue, legendValueClassName)}
          valueUnit="%"
        />
        {Footer && (
          <Footer
            className={cx(classes.footer, footerClassName)}
            paymentCount={entriesCount}
            categoryCount={categoryCount}
          />
        )}
      </div>
    )
  }
}

export const dataPropShape = PropTypes.objectOf(
  PropTypes.arrayOf(pieChartDataShape)
)

PieChart.propTypes = {
  categoryLimit: PropTypes.number.isRequired,
  chartSize: PropTypes.number.isRequired,
  data: dataPropShape,
  entriesCount: PropTypes.number.isRequired,
  footer: PropTypes.element,
  hideChart: PropTypes.bool,
  hidePeriod: PropTypes.bool,
  legendClassName: PropTypes.string,
  legendIconClassName: PropTypes.string,
  legendItemClassName: PropTypes.string,
  legendNameClassName: PropTypes.string,
  legendValueClassName: PropTypes.string,
  onCategoryClick: PropTypes.func,
  period: PropTypes.string,
  switcherClassName: PropTypes.string,
  switcherLabel: PropTypes.string,
}

PieChart.defaultProps = {
  categoryLimit: DEFAULT_LIMIT,
  chartSize: 350,
  switcherLabel: '% of total',
}

export default injectStyles(styles)(PieChart)
