import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { limitCategoriesTo } from 'data/models/categories'
import { pieDataProp } from 'data/models/charts'
import CategoryList from 'components/CategoryList'
import Pie from 'components/Charts/Pie'
import CategoryTypeSelect from './CategoryTypeSelect'
import PeriodSelector from './PeriodSelector'
import styles from './CategoryListPieChart.jss'

class CategoryListPieChart extends React.PureComponent {
  state = {
    activeKey: null,
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const {
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
      noWrap,
      onCategoryClick,
      onCategoryTypeChange,
      onPeriodChange,
      period,
      periods,
      periodSelectClassName,
      switcherClassName,
      switcherLabel,
    } = this.props

    const categories = limitCategoriesTo(5)(data)
    const { items, other } = categories
    const pieData = other ? R.append(other, items) : items

    const OptionalContainer = noWrap
      ? ({ children }) => <>{children}</>
      : ({ children }) => (
          <div
            className={cx(
              classes.root,
              hidePeriod && classes.hiddenPeriod,
              className
            )}
          >
            {children}
          </div>
        )

    return (
      <OptionalContainer>
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
          <CategoryTypeSelect
            className={cx(classes.switcher, switcherClassName)}
            label={switcherLabel}
            onChange={onCategoryTypeChange}
            value={categoryType}
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
          data={categories}
          nameClassName={cx(classes.legendItemName, legendNameClassName)}
          onCategoryClick={onCategoryClick}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueClassName={cx(classes.legendItemValue, legendValueClassName)}
          valueUnit="%"
        />
      </OptionalContainer>
    )
  }
}

CategoryListPieChart.propTypes = {
  categoryType: PropTypes.string.isRequired,
  chartSize: PropTypes.number.isRequired,
  data: pieDataProp.isRequired,
  hideChart: PropTypes.bool,
  hidePeriod: PropTypes.bool,
  legendClassName: PropTypes.string,
  legendIconClassName: PropTypes.string,
  legendItemClassName: PropTypes.string,
  legendNameClassName: PropTypes.string,
  legendValueClassName: PropTypes.string,
  noWrap: PropTypes.bool,
  onCategoryClick: PropTypes.func, // category object in callback
  onCategoryTypeChange: PropTypes.func,
  onPeriodChange: PropTypes.func,
  period: PropTypes.string,
  periods: PropTypes.arrayOf(PropTypes.string),
  switcherClassName: PropTypes.string,
  switcherLabel: PropTypes.string,
}

CategoryListPieChart.defaultProps = {
  chartSize: 350,
}

export default injectStyles(styles)(CategoryListPieChart)
