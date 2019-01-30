// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import CategoryLabel from 'components/CategoryLabel'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { type IndexedPieChartCategory } from '../utils'
import OtherCategories from './OtherCategories'
import styles from './CategoryList.jss'

const CLICKABLE = true

// Duplicate definition for the prop-type generator
type CategoryListData = {|
  filler?: IndexedPieChartCategory,
  items: Array<IndexedPieChartCategory>,
  other: ?IndexedPieChartCategory,
  tooltipItems: Array<IndexedPieChartCategory>,
|}

export type CategoryListProps = {|
  activeCategoryIndex: ?number,
  className?: string,
  data: CategoryListData,
  mobile?: boolean,
  onCategoryClick?: number => void,
  onLabelMouseEnter?: number => void,
  onLabelMouseLeave?: () => void,
  valueUnit?: string,
|}

type Props = {
  ...CategoryListProps,
  //
  ...InjectStylesProps,
  iconClassName?: string,
  itemClassName?: string,
  nameClassName?: string,
  valueClassName?: string,
  inheritCursor?: boolean,
}

const CategoryList = ({
  activeCategoryIndex,
  classes,
  className,
  data: { items, other, tooltipItems },
  iconClassName,
  itemClassName,
  nameClassName,
  mobile,
  onCategoryClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  valueClassName,
  valueUnit,
}: Props) => {
  const highlighted = R.not(R.isNil(activeCategoryIndex))

  const renderItem = clickable => ({
    id,
    index,
    ...otherProps
  }: IndexedPieChartCategory) => {
    const handleClick =
      clickable && onCategoryClick ? () => onCategoryClick(index) : null
    const handleMouseEnter =
      !mobile && onLabelMouseEnter ? () => onLabelMouseEnter(index) : undefined
    const handleMouseLeave = mobile ? undefined : onLabelMouseLeave
    return (
      <CategoryLabel
        active={index === activeCategoryIndex}
        activeClassName={classes.active}
        className={cx(
          classes.item,
          { [classes.nonclickableItem]: !clickable },
          itemClassName
        )}
        iconClassName={cx(classes.icon, iconClassName)}
        key={index}
        nameClassName={cx(classes.name, nameClassName)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        valueClassName={cx(classes.value, valueClassName)}
        valueUnit={valueUnit}
        {...otherProps}
      />
    )
  }

  return (
    <div
      className={cx(
        classes.root,
        highlighted && classes.highlighted,
        className
      )}
    >
      {R.map(renderItem(CLICKABLE), items)}
      {other &&
        (mobile ? (
          renderItem(!CLICKABLE)(other)
        ) : tooltipItems && tooltipItems.length > 0 ? (
          <OtherCategories
            anchor={renderItem(!CLICKABLE)(other)}
            items={tooltipItems}
            valueUnit={valueUnit}
          />
        ) : (
          renderItem(CLICKABLE)(other)
        ))}
    </div>
  )
}

export default injectStyles(styles)(CategoryList)
