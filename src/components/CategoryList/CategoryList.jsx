import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { categoriesProp } from 'data/models/categories'
import CategoryLabel from 'components/CategoryLabel'
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
  activeKey,
  activeLabelClassName,
  classes,
  className,
  data: { items, other, tooltipItems },
  iconClassName,
  itemClassName,
  nameClassName,
  onCategoryClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  tooltipIconClassName,
  tooltipItemClassName,
  tooltipNameClassName,
  tooltipValueClassName,
  valueClassName,
  valueUnit,
}) => {
  const renderItem = ({ key, ...otherProps }) => (
    <CategoryLabel
      active={key === activeKey}
      activeClassName={activeLabelClassName}
      className={cx(classes.item, itemClassName)}
      iconClassName={iconClassName}
      key={key}
      nameClassName={nameClassName}
      onClick={onCategoryClick && (() => onCategoryClick(items[key]))}
      onMouseEnter={onLabelMouseEnter && (() => onLabelMouseEnter(key))}
      onMouseLeave={onLabelMouseLeave && (() => onLabelMouseLeave(key))}
      valueClassName={valueClassName}
      valueUnit={valueUnit}
      {...otherProps}
    />
  )

  const renderTooltipItem = ({ key, ...otherProps }) => (
    <CategoryLabel
      className={cx(classes.tooltipItem, tooltipItemClassName)}
      iconClassName={cx(classes.tooltipIcon, tooltipIconClassName)}
      key={key}
      nameClassName={cx(classes.tooltipName, tooltipNameClassName)}
      valueClassName={cx(classes.tooltipValue, tooltipValueClassName)}
      valueUnit={valueUnit}
      {...otherProps}
    />
  )

  return (
    <div className={className}>
      {R.map(renderItem, items)}
      {other && (
        <OtherCategories
          key="other"
          categories={tooltipItems}
          renderTooltipItem={renderTooltipItem}
        >
          {renderItem(other)}
        </OtherCategories>
      )}
    </div>
  )
}

export const categoryListClasses = {
  activeLabelClassName: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  nameClassName: PropTypes.string,
  tooltipIconClassName: PropTypes.string,
  tooltipItemClassName: PropTypes.string,
  tooltipNameClassName: PropTypes.string,
  tooltipValueClassName: PropTypes.string,
  valueClassName: PropTypes.string,
}

CategoryList.propTypes = {
  ...categoryListClasses,
  activeKey: PropTypes.number,
  data: categoriesProp,
  onCategoryClick: PropTypes.func,
  onLabelMouseEnter: PropTypes.func,
  onLabelMouseLeave: PropTypes.func,
  valueUnit: PropTypes.string,
}

export default injectStyles(styles)(CategoryList)
