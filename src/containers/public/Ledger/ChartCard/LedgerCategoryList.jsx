// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import type { CategoryListProps } from 'components/CategoryList'

const styles = {
  root: {
    left: -26,
    paddingBottom: 5,
  },
  item: {
    '&:not(:last-child)': {
      paddingBottom: 6,
    },
  },
  name: {
    fontSize: 18,
    lineHeight: 26,
  },
  value: {
    fontSize: 18,
    lineHeight: 26,
  },
  icon: {
    width: 14,
    height: 14,
  },
}

type Props = CategoryListProps & { classes: Object }

const LedgerCategoryList = ({
  classes,
  className,
  data,
  //
  activeCategoryIndex,
  onCategoryClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  valueUnit,
}: Props) => (
  <CategoryList
    activeCategoryIndex={activeCategoryIndex}
    className={cx(classes.root, className)}
    data={data}
    itemClassName={classes.item}
    iconClassName={classes.icon}
    nameClassName={classes.name}
    valueClassName={classes.value}
    onCategoryClick={onCategoryClick}
    onLabelMouseEnter={onLabelMouseEnter}
    onLabelMouseLeave={onLabelMouseLeave}
    valueUnit={valueUnit}
  />
)

export default injectStyles(styles)(LedgerCategoryList)
