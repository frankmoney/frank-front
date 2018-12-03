// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import CategoryTypeSelect from 'components/CategoryTypeSelect'
import Pie from 'components/Charts/Pie'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import type { CategoryListProps } from './CategoryList'
import limitCategories, {
  type CategoryCb,
  type CategoryListData,
  type IndexedPieChartCategory,
  type PieChartCategories,
} from './utils'
import styles from './OverviewPieChart.jss'

export type CategoryListComponent = React.ComponentType<CategoryListProps>

export type CategoryListPieChartRootComponent = React.ComponentType<any> // flowlint-line unclear-type:warn

type Props = {|
  ...InjectStylesProps,
  //
  CategoryList: React.Element<CategoryListComponent>,
  categoryType: string,
  categoryTypeSelectClassName?: string,
  categoryTypeSelectLabel?: string,
  chartClassName?: string,
  chartSize: number,
  component: CategoryListPieChartRootComponent,
  data: PieChartCategories,
  onCategoryClick?: CategoryCb,
  onCategoryTypeChange?: CategoryCb,
|}

export type State = {|
  activeCategoryIndex: ?number,
|}

class OverviewPieChart extends React.PureComponent<Props, State> {
  static defaultProps = {
    component: 'div',
  }

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

    const categories: CategoryListData = limitCategories(5)(data)
    const { items, other } = categories
    const pieData: Array<IndexedPieChartCategory> = other
      ? R.append(other, items)
      : items

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
        {React.cloneElement(CategoryList, {
          activeCategoryIndex,
          className: classes.categoryList,
          data: categories,
          onCategoryClick,
          onLabelMouseEnter: this.handleMouseOver,
          onLabelMouseLeave: this.handleMouseOut,
          valueUnit: '%',
        })}
      </Root>
    )
  }
}

export default injectStyles(styles)(OverviewPieChart)