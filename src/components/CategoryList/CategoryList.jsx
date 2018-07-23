import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'
import CategoryLabel, { categoryPropTypes } from 'components/CategoryLabel'
import OtherCategories from './OtherCategories'

const MAX_LEGEND_ITEMS = 5
const DEFAULT_CATEGORY_COLOR = '#B3B3B3'

const styles = theme => ({
  tooltipItem: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: 12,
    },
  },
  tooltipIcon: {
    height: 12,
    width: 12,
  },
  tooltipName: {
    flex: [1, 1],
    paddingRight: 40,
    ...theme.fontMedium(14, 16),
  },
  tooltipCounter: {
    flex: [1, 1],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: 'black !important',
  },
})

const getCounterSum = R.pipe(
  R.map(R.prop('counter')),
  R.sum
)

const CategoryList = ({
  categories,
  classes,
  className,
  counterClassName,
  counterUnit,
  iconClassName,
  itemClassName,
  itemIconSize,
  nameClassName,
  tooltipCounterClassName,
  tooltipIconClassName,
  tooltipItemClassName,
  tooltipItemIconSize,
  tooltipNameClassName,
}) => {
  const renderItem = ({ ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: cx(classes.item, itemClassName),
      counterClassName,
      counterUnit,
      iconClassName,
      nameClassName,
      size: itemIconSize,
      ...otherProps,
    })

  const renderTooltipItem = ({ ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: cx(classes.tooltipItem, tooltipItemClassName),
      counterClassName: cx(classes.tooltipCounter, tooltipCounterClassName),
      counterUnit,
      iconClassName: cx(classes.tooltipIcon, tooltipIconClassName),
      nameClassName: cx(classes.tooltipName, tooltipNameClassName),
      size: tooltipItemIconSize,
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
  categories: PropTypes.arrayOf(PropTypes.shape(categoryPropTypes)),
  counterClassName: PropTypes.string,
  counterUnit: PropTypes.string,
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  nameClassName: PropTypes.string,
  tooltipCounterClassName: PropTypes.string,
  tooltipItemClassName: PropTypes.string,
  tooltipIconClassName: PropTypes.string,
  tooltipNameClassName: PropTypes.string,
}

export default injectStyles(styles)(CategoryList)
