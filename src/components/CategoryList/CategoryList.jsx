import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'
import CategoryLabel from 'components/CategoryLabel'
import OtherCategories from './OtherCategories'

const MAX_LEGEND_ITEMS = 5
const DEFAULT_CATEGORY_COLOR = '#B3B3B3'

const styles = {
  item: {},
  itemName: {},
  itemCounter: {},
}

const getCounterSum = R.pipe(
  R.map(R.prop('counter')),
  R.sum
)

const CategoryList = ({
  categories,
  classes,
  className,
  counterUnit,
  itemIconSize,
  tooltipItemIconSize,
}) => {
  const renderItem = ({ ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: classes.item,
      classes: { name: classes.itemName, counter: classes.itemCounter },
      size: itemIconSize,
      counterUnit,
      ...otherProps,
    })

  const renderTooltipItem = ({ ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: classes.tooltipItem,
      classes: {
        name: classes.tooltipItemName,
        counter: classes.tooltipItemCounter,
      },
      size: tooltipItemIconSize,
      counterUnit,
      ...otherProps,
    })

  const mapList = R.ifElse(
    array => R.lt(MAX_LEGEND_ITEMS + 1, R.length(array)),
    R.map(renderItem),
    R.converge(R.append, [
      R.pipe(
        R.slice(MAX_LEGEND_ITEMS - 1, Infinity),
        otherCategories => (
          <OtherCategories
            categories={otherCategories}
            renderTooltipItem={renderTooltipItem}
          >
            {renderItem({
              name: 'Other categories',
              color: DEFAULT_CATEGORY_COLOR,
              counter: getCounterSum(otherCategories),
            })}
          </OtherCategories>
        )
      ),
      R.pipe(
        R.slice(0, MAX_LEGEND_ITEMS - 1),
        R.map(renderItem)
      ),
    ])
  )

  return <div className={className}>{mapList(categories)}</div>
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(CategoryLabel.propTypes)),
  counterUnit: PropTypes.string,
  itemIconSize: PropTypes.number,
  tooltipItemIconSize: PropTypes.number,
}

CategoryList.defaultProps = {
  itemIconSize: 16,
  tooltipItemIconSize: 12,
}

export default injectStyles(styles)(CategoryList)
