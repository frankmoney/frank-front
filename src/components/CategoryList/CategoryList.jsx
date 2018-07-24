import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'
import CategoryLabel, { categoryPropTypes } from 'components/CategoryLabel'
import limitCategories from 'utils/limitCategories'
import OtherCategories from './OtherCategories'

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
    whiteSpace: 'nowrap',
  },
  tooltipCounter: {
    flex: [1, 1],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: 'black !important',
  },
})

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

  const { items, other, tooltipItems } = limitCategories(categories)

  return (
    <div className={className}>
      {R.map(renderItem, items)}
      {other && (
        <OtherCategories
          categories={tooltipItems}
          renderTooltipItem={renderTooltipItem}
        >
          {renderItem(other)}
        </OtherCategories>
      )}
    </div>
  )
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
