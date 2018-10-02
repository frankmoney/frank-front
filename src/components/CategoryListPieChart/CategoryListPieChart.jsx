import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { limitCategoriesTo } from 'data/models/categories'
import { pieDataProp } from 'data/models/charts'
import CategoryList, { categoryListClasses } from 'components/CategoryList'
import Pie from 'components/Charts/Pie'
import CategoryTypeSelect from './CategoryTypeSelect'
import styles from './CategoryListPieChart.jss'

class CategoryListPieChart extends React.PureComponent {
  state = {
    activeKey: null,
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const {
      CategoryListClasses,
      categoryType,
      categoryTypeSelectClassName,
      categoryTypeSelectLabel,
      chartClassName,
      chartSize,
      classes,
      className,
      data,
      noWrap,
      onCategoryClick,
      onCategoryTypeChange,
    } = this.props

    const categories = limitCategoriesTo(5)(data)
    const { items, other } = categories
    const pieData = other ? R.append(other, items) : items

    const OptionalContainer = noWrap
      ? ({ children }) => <>{children}</>
      : ({ children }) => (
          <div className={cx(classes.root, className)}>{children}</div>
        )

    return (
      <OptionalContainer>
        <div className={cx(classes.chartContainer, chartClassName)}>
          <Pie
            activeKey={this.state.activeKey}
            className={classes.chart}
            data={pieData}
            onMouseEnter={this.handleMouseOver}
            onMouseLeave={this.handleMouseOut}
            size={chartSize}
          />
          <CategoryTypeSelect
            className={cx(
              classes.categoryTypeSelect,
              categoryTypeSelectClassName
            )}
            label={categoryTypeSelectLabel}
            onChange={onCategoryTypeChange}
            value={categoryType}
          />
        </div>
        <CategoryList
          activeKey={this.state.activeKey}
          activeLabelClassName={classes.activeLegendItem}
          className={cx(
            classes.legend,
            R.prop('className', CategoryListClasses),
            this.state.activeKey !== null && classes.highlightedLegend
          )}
          iconClassName={cx(
            classes.legendIcon,
            R.prop('iconClassName', CategoryListClasses)
          )}
          itemClassName={cx(
            classes.legendItem,
            R.prop('itemClassName', CategoryListClasses)
          )}
          data={categories}
          nameClassName={cx(
            classes.legendItemName,
            R.prop('nameClassName', CategoryListClasses)
          )}
          onCategoryClick={onCategoryClick}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueClassName={cx(
            classes.legendItemValue,
            R.prop('valueClassName', CategoryListClasses)
          )}
          valueUnit="%"
        />
      </OptionalContainer>
    )
  }
}

CategoryListPieChart.propTypes = {
  categoryType: PropTypes.string.isRequired,
  categoryTypeSelectLabel: PropTypes.string,
  chartSize: PropTypes.number.isRequired,
  data: pieDataProp.isRequired,
  noWrap: PropTypes.bool,
  onCategoryClick: PropTypes.func, // category object in callback
  onCategoryTypeChange: PropTypes.func,
  // Styles
  categoryTypeSelectClassName: PropTypes.string,
  chartClassName: PropTypes.string,
  //
  CategoryListClasses: categoryListClasses,
}

CategoryListPieChart.defaultProps = {
  chartSize: 350,
}

export default injectStyles(styles)(CategoryListPieChart)
