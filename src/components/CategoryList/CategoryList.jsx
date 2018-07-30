import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'
import CategoryLabel from 'components/CategoryLabel'
import OtherCategories from './OtherCategories'

const MAX_LEGEND_ITEMS = 5

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
  className,
  classes,
  itemIconSize = 16,
  tooltipItemIconSize = 12,
  counterUnit,
  categories,
}) => {
  const renderItem = ({ id, ...otherProps }) =>
    renderProp(CategoryLabel, {
      key: id,
      className: classes.item,
      classes: { name: classes.itemName, counter: classes.itemCounter },
      size: itemIconSize,
      counterUnit,
      ...otherProps,
    })

  const renderTooltipItem = ({ id, ...otherProps }) =>
    renderProp(CategoryLabel, {
      key: id,
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
            key="other"
            categories={otherCategories}
            renderTooltipItem={renderTooltipItem}
          >
            {renderItem({
              name: 'Other categories',
              color: '#B3B3B3',
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

export default injectStyles(styles)(CategoryList)
