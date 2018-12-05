// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import CategoryLabel from 'components/CategoryLabel'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { OTHER, type CategoryCb, type IndexedPieChartCategory } from '../utils'
import OtherCategories from './OtherCategories'
import styles from './CategoryList.jss'

// Duplicate definition for the prop-type generator
type CategoryListData = {|
  items: Array<IndexedPieChartCategory>,
  other: ?IndexedPieChartCategory,
  tooltipItems: Array<IndexedPieChartCategory>,
|}

export type CategoryListProps = {|
  activeCategoryIndex: ?number,
  className?: string,
  data: CategoryListData,
  onCategoryClick?: CategoryCb,
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
}

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

  const renderItem = ({
    id,
    index,
    ...otherProps
  }: IndexedPieChartCategory) => {
    const handleClick =
      onCategoryClick && id !== OTHER.id
        ? () => onCategoryClick(items[index])
        : null
    return (
      <CategoryLabel
        active={index === activeCategoryIndex}
        activeClassName={classes.active}
        className={cx(classes.item, itemClassName)}
        iconClassName={cx(classes.icon, iconClassName)}
        key={index}
        nameClassName={cx(classes.name, nameClassName)}
        onClick={handleClick}
        onMouseEnter={onLabelMouseEnter && (() => onLabelMouseEnter(index))}
        onMouseLeave={onLabelMouseLeave}
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
      {R.map(renderItem, items)}
      {other && (
        <OtherCategories
          anchor={renderItem(other)}
          items={tooltipItems}
          valueUnit={valueUnit}
        />
      )}
    </div>
  )
}

export default injectStyles(styles)(CategoryList)
