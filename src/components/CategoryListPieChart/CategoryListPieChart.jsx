// @flow
import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { pieDataProp } from 'data/models/charts'
import Pie from 'components/Charts/Pie'
import CategoryTypeSelect from './CategoryTypeSelect'
import limitCategories from './utils'
import styles from './CategoryListPieChart.jss'

class CategoryListPieChart extends React.PureComponent {
  state = {
    activeCategoryIndex: null,
  }

  handleMouseOver = index => this.setState({ activeCategoryIndex: index })

  handleMouseOut = () => this.setState({ activeCategoryIndex: null })

  render() {
    const {
      CategoryList,
      categoryType,
      categoryTypeSelectClassName,
      categoryTypeSelectLabel,
      chartClassName,
      chartSize,
      classes,
      className,
      component: Root,
      data,
      onCategoryClick,
      onCategoryTypeChange,
    } = this.props
    const { activeCategoryIndex } = this.state

    const categories = limitCategories(5)(data)
    const { items, other } = categories
    const pieData = other ? R.append(other, items) : items

    const rootProps =
      Root === React.Fragment
        ? undefined
        : { className: cx(classes.root, className) }
    return (
      <Root {...rootProps}>
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
          className={classes.categoryList}
          data={categories}
          onCategoryClick={onCategoryClick}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          valueUnit="%"
        />
      </Root>
    )
  }
}

CategoryListPieChart.propTypes = {
  CategoryList: PropTypes.element.isRequired,
  categoryType: PropTypes.string.isRequired,
  categoryTypeSelectLabel: PropTypes.string,
  chartSize: PropTypes.number.isRequired,
  data: pieDataProp.isRequired,
  onCategoryClick: PropTypes.func, // category object in callback
  onCategoryTypeChange: PropTypes.func,
  // Styles
  categoryTypeSelectClassName: PropTypes.string,
  chartClassName: PropTypes.string,
}

CategoryListPieChart.defaultProps = {
  component: 'div',
}

export default injectStyles(styles)(CategoryListPieChart)
