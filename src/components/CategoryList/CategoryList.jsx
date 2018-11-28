// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import CategoryLabel from 'components/CategoryLabel'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import OtherCategories from './OtherCategories'
import styles from './CategoryList.jss'
import type { CategoryListData, CategoryCb } from './CategoryList.flow'

export type CategoryListProps = {|
  activeCategoryIndex: ?number,
  data: CategoryListData,
  valueUnit?: string,
  // Handlers
  onCategoryClick?: CategoryCb,
  onLabelMouseEnter?: number => void,
  onLabelMouseLeave?: () => void,
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
      onMouseLeave={onLabelMouseLeave}
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
