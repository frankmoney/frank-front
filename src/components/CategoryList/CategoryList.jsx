import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel, { categoryPropTypes } from 'components/CategoryLabel'
import OtherCategories from './OtherCategories'

const styles = theme => ({
  root: {
    flex: [0, 0, 'auto'],
    position: 'relative',
  },
  item: {
    cursor: 'pointer',
  },
  icon: {
    marginRight: 13,
  },
  name: {
    ...theme.fontMedium(22, 26),
  },
  value: {
    ...theme.fontRegular(22, 26),
  },
  highlighted: {
    '& > $item': {
      opacity: 0.4,
    },
    '& > $active': {
      opacity: 1,
    },
  },
  active: {},
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
  const highlighted = R.not(R.isNil(activeCategoryIndex))

  const renderItem = ({ index, ...otherProps }) => (
    <CategoryLabel
      active={index === activeCategoryIndex}
      activeClassName={classes.active}
      className={cx(classes.item, itemClassName)}
      iconClassName={cx(classes.icon, iconClassName)}
      key={index}
      nameClassName={cx(classes.name, nameClassName)}
      onClick={onCategoryClick && (() => onCategoryClick(items[index]))}
      onMouseEnter={onLabelMouseEnter && (() => onLabelMouseEnter(index))}
      onMouseLeave={onLabelMouseLeave && (() => onLabelMouseLeave(index))}
      valueClassName={cx(classes.value, valueClassName)}
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
    <div
      className={cx(
        classes.root,
        highlighted && classes.highlighted,
        rootClassName,
        className
      )}
    >
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

const categoryListClasses = PropTypes.shape({
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

const categoryShape = PropTypes.shape(categoryPropTypes)

export const categoryListProps = {
  activeCategoryIndex: PropTypes.number,
  onCategoryClick: PropTypes.func,
  onLabelMouseEnter: PropTypes.func,
  onLabelMouseLeave: PropTypes.func,
  valueUnit: PropTypes.string,
}

export const categoryListDataProps = PropTypes.shape({
  items: PropTypes.arrayOf(categoryShape),
  other: categoryShape,
  tooltipItems: PropTypes.arrayOf(categoryShape),
})

CategoryList.propTypes = {
  ...categoryListProps,
  Classes: categoryListClasses,
  data: categoryListDataProps,
}

export default injectStyles(styles)(CategoryList)
