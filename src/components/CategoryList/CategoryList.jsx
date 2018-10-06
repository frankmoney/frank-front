import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel, { categoryProps } from 'components/CategoryLabel'
import OtherCategories from './OtherCategories'

const styles = theme => ({
  item: {},
  tooltipItem: {
    alignItems: 'center',
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
  activeCategoryIndex,
  classes,
  Classes: {
    activeLabel: activeLabelClassName,
    icon: iconClassName,
    item: itemClassName,
    name: nameClassName,
    root: rootClassName,
    tooltipIcon: tooltipIconClassName,
    tooltipItem: tooltipItemClassName,
    tooltipName: tooltipNameClassName,
    tooltipValue: tooltipValueClassName,
    value: valueClassName,
  } = {},
  className,
  data: { items, other, tooltipItems },
  onCategoryClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  valueUnit,
}) => {
  const renderItem = ({ index, ...otherProps }) => (
    <CategoryLabel
      active={index === activeCategoryIndex}
      activeClassName={activeLabelClassName}
      className={cx(classes.item, itemClassName)}
      iconClassName={iconClassName}
      key={index}
      nameClassName={nameClassName}
      onClick={onCategoryClick && (() => onCategoryClick(items[index]))}
      onMouseEnter={onLabelMouseEnter && (() => onLabelMouseEnter(index))}
      onMouseLeave={onLabelMouseLeave && (() => onLabelMouseLeave(index))}
      valueClassName={valueClassName}
      valueUnit={valueUnit}
      {...otherProps}
    />
  )

  const renderTooltipItem = ({ index, ...otherProps }) => (
    <CategoryLabel
      className={cx(classes.tooltipItem, tooltipItemClassName)}
      iconClassName={cx(classes.tooltipIcon, tooltipIconClassName)}
      key={index}
      nameClassName={cx(classes.tooltipName, tooltipNameClassName)}
      valueClassName={cx(classes.tooltipValue, tooltipValueClassName)}
      valueUnit={valueUnit}
      {...otherProps}
    />
  )

  return (
    <div className={cx(rootClassName, className)}>
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

export const categoryListClasses = PropTypes.shape({
  activeLabel: PropTypes.string,
  icon: PropTypes.string,
  item: PropTypes.string,
  name: PropTypes.string,
  root: PropTypes.string,
  tooltipIcon: PropTypes.string,
  tooltipItem: PropTypes.string,
  tooltipName: PropTypes.string,
  tooltipValue: PropTypes.string,
  value: PropTypes.string,
})

const categoryShape = PropTypes.shape(categoryProps)

CategoryList.propTypes = {
  activeCategoryIndex: PropTypes.number,
  Classes: categoryListClasses,
  data: PropTypes.shape({
    items: PropTypes.arrayOf(categoryShape),
    other: categoryShape,
    tooltipItems: PropTypes.arrayOf(categoryShape),
  }),
  onCategoryClick: PropTypes.func,
  onLabelMouseEnter: PropTypes.func,
  onLabelMouseLeave: PropTypes.func,
  valueUnit: PropTypes.string,
}

export default injectStyles(styles)(CategoryList)
