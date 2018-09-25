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
  data,
  iconClassName,
  itemClassName,
  nameClassName,
  onLabelClick,
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
      onClick={onLabelClick && (() => onLabelClick(key))}
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

  const { items, other, tooltipItems } = data

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

CategoryList.propTypes = {
  activeKey: PropTypes.number,
  activeLabelClassName: PropTypes.string,
  data: categoriesProp,
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
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
