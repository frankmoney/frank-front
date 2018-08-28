import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { pieChartDataShape } from 'components/Charts/shapes'
import renderProp from 'utils/renderProp'
import CategoryLabel from 'components/CategoryLabel'
import limitCategories, { limitedCategoriesProps } from 'utils/limitCategories'
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
  categories,
  classes,
  className,
  iconClassName,
  itemClassName,
  limitedCategories,
  nameClassName,
  onLabelMouseEnter,
  onLabelMouseLeave,
  onLabelClick,
  tooltipIconClassName,
  tooltipItemClassName,
  tooltipNameClassName,
  tooltipValueClassName,
  valueClassName,
  valueUnit,
}) => {
  const renderItem = ({ key, ...otherProps }) =>
    renderProp(CategoryLabel, {
      active: key === activeKey,
      activeClassName: activeLabelClassName,
      className: cx(classes.item, itemClassName),
      iconClassName,
      key,
      nameClassName,
      onClick: onLabelClick && (() => onLabelClick(otherProps.id)),
      onMouseEnter: onLabelMouseEnter && (() => onLabelMouseEnter(key)),
      onMouseLeave: onLabelMouseLeave && (() => onLabelMouseLeave(key)),
      valueClassName,
      valueUnit,
      ...otherProps,
    })

  const renderTooltipItem = ({ id, ...otherProps }) =>
    renderProp(CategoryLabel, {
      className: cx(classes.tooltipItem, tooltipItemClassName),
      iconClassName: cx(classes.tooltipIcon, tooltipIconClassName),
      nameClassName: cx(classes.tooltipName, tooltipNameClassName),
      valueClassName: cx(classes.tooltipValue, tooltipValueClassName),
      valueUnit,
      ...otherProps,
    })

  const { items, other, tooltipItems } =
    limitedCategories || limitCategories(categories)

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
  activeKey: PropTypes.number,
  activeLabelClassName: PropTypes.string,
  categories: PropTypes.arrayOf(pieChartDataShape),
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  limitedCategories: PropTypes.shape(limitedCategoriesProps),
  nameClassName: PropTypes.string,
  onLabelMouseEnter: PropTypes.func,
  onLabelMouseLeave: PropTypes.func,
  tooltipIconClassName: PropTypes.string,
  tooltipItemClassName: PropTypes.string,
  tooltipNameClassName: PropTypes.string,
  tooltipValueClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  valueUnit: PropTypes.string,
}

export default injectStyles(styles)(CategoryList)
