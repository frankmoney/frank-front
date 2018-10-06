import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { limitCategoriesTo } from 'data/models/categories'
import { pieDataProp } from 'data/models/charts'
import CategoryList, { categoryListClasses } from 'components/CategoryList'
import Pie from 'components/Charts/Pie'
import combineClassNames from 'utils/combineClassNames'
import CategoryTypeSelect from './CategoryTypeSelect'
import styles from './CategoryListPieChart.jss'

class CategoryListPieChartContents extends React.PureComponent {
  state = {
    activeCategoryIndex: null,
  }

  handleMouseOver = index => this.setState({ activeCategoryIndex: index })

  handleMouseOut = () => this.setState({ activeCategoryIndex: null })

  render() {
    const {
      CategoryListClasses,
      categoryType,
      categoryTypeSelectClassName,
      categoryTypeSelectLabel,
      chartClassName,
      chartSize,
      classes,
      data,
      onCategoryClick,
      onCategoryTypeChange,
    } = this.props
    const { activeCategoryIndex } = this.state

    const categories = limitCategoriesTo(5)(data)
    const { items, other } = categories
    const pieData = other ? R.append(other, items) : items

    return (
      <>
        <div className={cx(classes.chartContainer, chartClassName)}>
          <Pie
            activeSegmentIndex={activeCategoryIndex}
            data={pieData}
            onSegmentMouseEnter={this.handleMouseOver}
            onSegmentMouseLeave={this.handleMouseOut}
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
          activeCategoryIndex={activeCategoryIndex}
          Classes={combineClassNames(
            {
              activeLabel: classes.activeLegendItem,
              icon: classes.legendIcon,
              item: classes.legendItem,
              name: classes.legendItemName,
              root: cx(
                classes.legend,
                activeCategoryIndex !== null && classes.highlightedLegend
              ),
              value: classes.legendItemValue,
            },
            CategoryListClasses
          )}
          data={categories}
          onCategoryClick={onCategoryClick}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueUnit="%"
        />
      </>
    )
  }
}

const CategoryListPieChart = ({ classes, className, noWrap, ...props }) => {
  const content = <CategoryListPieChartContents classes={classes} {...props} />
  return noWrap ? (
    content
  ) : (
    <div className={cx(classes.root, className)}>{content}</div>
  )
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

export default injectStyles(styles)(CategoryListPieChart)
