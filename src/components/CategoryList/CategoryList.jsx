// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel from 'components/CategoryLabel'
import OtherCategories from './OtherCategories'
import styles from './CategoryList.jss'
import type { Props } from './CategoryList.flow'

const CategoryList = ({
  activeCategoryIndex,
  classes,
  className,
  data: { items, other, tooltipItems },
  iconClassName,
  itemClassName,
  nameClassName,
  onCategoryClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  valueClassName,
  valueUnit,
}: Props) => {
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
      className={classes.tooltipItem}
      iconClassName={classes.tooltipIcon}
      key={index}
      nameClassName={classes.tooltipName}
      valueClassName={classes.tooltipValue}
      valueUnit={valueUnit}
      {...otherProps}
    />
  )

  return (
    <div
      className={cx(
        classes.root,
        highlighted && classes.highlighted,
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

export default injectStyles(styles)(CategoryList)
