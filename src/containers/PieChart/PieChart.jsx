import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { categoricalDataShape } from 'components/Charts/shapes'
import CategoryList from 'components/CategoryList'
import DropdownSwitcher from 'components/DropdownSwitcher'
import Pie from 'components/Charts/Pie'
import limitCategories from 'utils/limitCategories'
import PeriodSelector from './PeriodSelector'
import styles from './PieChart.jss'

export const pieCategoryTypes = [{ key: 'income' }, { key: 'spending' }]

class PieChart extends React.PureComponent {
  state = {
    activeKey: null,
    categoryType: 'spending',
    period: this.props.period,
  }

  handleChangeCategoryType = event => {
    this.setState({ categoryType: event.target.value })
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const {
      categories,
      chartClassName,
      chartSize,
      classes,
      className,
      footer: Footer,
      footerClassName,
      hideChart,
      hidePeriod,
      legendClassName,
      legendIconClassName,
      legendItemClassName,
      legendNameClassName,
      legendValueClassName,
      period,
      switcherClassName,
      switcherLabel,
    } = this.props

    const { categoryType } = this.state

    const data = categories[categoryType]
    const limitedCategories = limitCategories(data)
    const { items, other } = limitedCategories
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
          <PeriodSelector className={classes.periodSelect} value={period} />
        )}
        <div className={classes.content}>
          {!hideChart && (
            <div className={cx(classes.chartContainer, chartClassName)}>
              <Pie
                activeKey={this.state.activeKey}
                className={classes.chart}
                data={pieData}
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
                size={chartSize}
              />
              <DropdownSwitcher
                className={cx(classes.switcher, switcherClassName)}
                label={switcherLabel}
                onChange={this.handleChangeCategoryType}
                value={categoryType}
                values={pieCategoryTypes}
              />
            </div>
          )}
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
            onLabelMouseEnter={this.handleMouseOver}
            onLabelMouseLeave={this.handleMouseOut}
            tooltip
            valueClassName={cx(classes.legendItemValue, legendValueClassName)}
            valueUnit="%"
          />
        </div>
        {// TODO: real counts
        Footer && (
          <Footer
            className={cx(classes.footer, footerClassName)}
            paymentCount={954}
            categoryCount={5}
          />
        )}
      </div>
    )
  }
}

PieChart.propTypes = {
  categories: PropTypes.arrayOf(categoricalDataShape),
  chartSize: PropTypes.number.isRequired,
  footer: PropTypes.element,
  hideChart: PropTypes.bool,
  hidePeriod: PropTypes.bool,
  legendClassName: PropTypes.string,
  legendIconClassName: PropTypes.string,
  legendItemClassName: PropTypes.string,
  legendNameClassName: PropTypes.string,
  legendValueClassName: PropTypes.string,
  period: PropTypes.string,
  switcherClassName: PropTypes.string,
  switcherLabel: PropTypes.string,
}

PieChart.defaultProps = {
  chartSize: 350,
  switcherLabel: '% of total',
}

export default injectStyles(styles)(PieChart)
