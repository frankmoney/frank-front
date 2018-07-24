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
  tooltipValue: {
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
  iconClassName,
  itemClassName,
  itemIconSize,
  nameClassName,
  tooltipIconClassName,
  tooltipItemClassName,
  tooltipItemIconSize,
  tooltipNameClassName,
  tooltipValueClassName,
  valueClassName,
  valueUnit,
}) => {
  const renderItem = ({ ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: cx(classes.item, itemClassName),
      iconClassName,
      nameClassName,
      size: itemIconSize,
      valueClassName,
      valueUnit,
      ...otherProps,
    })

  const renderTooltipItem = ({ ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: cx(classes.tooltipItem, tooltipItemClassName),
      iconClassName: cx(classes.tooltipIcon, tooltipIconClassName),
      nameClassName: cx(classes.tooltipName, tooltipNameClassName),
      size: tooltipItemIconSize,
      valueClassName: cx(classes.tooltipValue, tooltipValueClassName),
      valueUnit,
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
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  nameClassName: PropTypes.string,
  tooltipIconClassName: PropTypes.string,
  tooltipItemClassName: PropTypes.string,
  tooltipNameClassName: PropTypes.string,
  tooltipValueClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  valueUnit: PropTypes.string,
}

export default injectStyles(styles)(CategoryList)
