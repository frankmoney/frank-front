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
  fillerIndex,
  type CategoryCb,
  type CategoryListData,
  type IndexedPieChartCategory,
  type PieChartCategories,
} from './utils'
import styles from './OverviewPieChart.jss'

const MAX_CATEGORIES = 5

export type CategoryListComponent = React.ComponentType<CategoryListProps>

export type CategoryListPieChartRootComponent = React.ComponentType<any> // flowlint-line unclear-type:warn

export type OverviewPieChartProps = {|
  mobile?: boolean,
  onCategoryClick?: CategoryCb,
  onPieTotalChange?: TotalSelectCb,
  pieTotal: PieTotal,
  pieTotalSelectable?: boolean,
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

const appendIfNotNil = item => items =>
  R.isNil(item) ? items : R.append(item, items)

class OverviewPieChart extends React.PureComponent<Props, State> {
  static defaultProps = {
    component: 'div',
  }

  state = {
    activeCategoryIndex: null,
  }

  handleMouseOver = index => {
    const ignoredIndex = fillerIndex(MAX_CATEGORIES)
    if (index === ignoredIndex) {
      this.setState({ activeCategoryIndex: null })
    } else {
      this.setState({ activeCategoryIndex: index })
    }
  }

  handleMouseOut = () => this.setState({ activeCategoryIndex: null })

  render() {
    const {
      CategoryList,
      chartClassName,
      chartSize,
      classes,
      className,
      component: Root,
      data,
      mobile,
      onCategoryClick,
      onPieTotalChange,
      pieTotal,
      pieTotalSelectable,
      pieTotalSelectClassName,
      pieTotalSelectLabel,
    } = this.props
    const { activeCategoryIndex } = this.state

    const categories: CategoryListData = limitCategories(MAX_CATEGORIES)(data)
    const { filler, items, other } = categories
    const pieData: Array<IndexedPieChartCategory> = R.pipe(
      R.map(R.assoc('clickable', true)),
      appendIfNotNil(other),
      appendIfNotNil(filler)
    )(items)

    const handleCategoryClick = onCategoryClick
      ? (index: number) => {
          const item = items[index]
          onCategoryClick(item)
        }
      : undefined

    const rootProps =
      Root === React.Fragment
        ? undefined
        : { className: cx(classes.root, className) }
    return (
      <Root {...rootProps}>
        <div className={cx(classes.chart, chartClassName)}>
          <Pie
            activeSegmentIndex={activeCategoryIndex}
            data={pieData}
            mobile={mobile}
            onSegmentMouseEnter={this.handleMouseOver}
            onSegmentMouseLeave={this.handleMouseOut}
            onSegmentClick={handleCategoryClick}
            size={chartSize}
          />
          <PieTotalSelect
            className={pieTotalSelectClassName}
            label={pieTotalSelectLabel}
            onChange={onPieTotalChange}
            selectable={pieTotalSelectable}
            value={pieTotal}
          />
        </div>
        {React.cloneElement(CategoryList, {
          activeCategoryIndex,
          data: categories,
          mobile,
          onCategoryClick: handleCategoryClick,
          onLabelMouseEnter: this.handleMouseOver,
          onLabelMouseLeave: this.handleMouseOut,
          valueUnit: '%',
        })}
      </Root>
    )
  }
}

export default injectStyles(styles)(OverviewPieChart)
