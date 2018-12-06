// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import Pie from 'components/Charts/Pie'
import type { PieTotal } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import type { CategoryListProps } from './CategoryList'
import PieTotalSelect, { type TotalSelectCb } from './PieTotalSelect'
import limitCategories, {
  type CategoryCb,
  type CategoryListData,
  type IndexedPieChartCategory,
  type PieChartCategories,
} from './utils'
import styles from './OverviewPieChart.jss'

export type CategoryListComponent = React.ComponentType<CategoryListProps>

export type CategoryListPieChartRootComponent = React.ComponentType<any> // flowlint-line unclear-type:warn

export type OverviewPieChartProps = {|
  onCategoryClick?: CategoryCb,
  onPieTotalChange?: TotalSelectCb,
  pieTotal: PieTotal,
  pieTotalSelectClassName?: string,
  pieTotalSelectLabel?: string,
|}

type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  //
  CategoryList: React.Element<CategoryListComponent>,
  chartClassName?: string,
  chartSize: number,
  component: CategoryListPieChartRootComponent,
  data: PieChartCategories,
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
      pieTotalSelectClassName,
      pieTotalSelectLabel,
      chartClassName,
      chartSize,
      classes,
      className,
      component: Root,
      data,
      onCategoryClick,
      onPieTotalChange,
      pieTotal,
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
          <PieTotalSelect
            className={pieTotalSelectClassName}
            label={pieTotalSelectLabel}
            onChange={onPieTotalChange}
            value={pieTotal}
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
