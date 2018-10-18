// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import type { CategoryListProps } from 'components/CategoryList'

const styles = theme => ({
  root: {
    order: 4,
    padding: [1, 2, 0, 0],
    position: 'static',
  },
  item: {
    padding: [15, 0, 18],
    '&:not(:last-child)': {
      borderBottom: '1px solid #F2F2F4',
    },
  },
  icon: {
    height: 14,
    width: 14,
  },
  name: {
    flexGrow: 1,
    ...theme.fontMedium(18, 26),
  },
  value: {
    ...theme.fontRegular(18, 26),
  },
})

type Props = CategoryListProps & { classes: Object }

const ButtonWidgetCategoryList = ({
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
    iconClassName={classes.icon}
    itemClassName={classes.item}
    nameClassName={classes.name}
    onCategoryClick={onCategoryClick}
    onLabelMouseEnter={onLabelMouseEnter}
    onLabelMouseLeave={onLabelMouseLeave}
    valueClassName={classes.value}
    valueUnit={valueUnit}
  />
)

export default injectStyles(styles)(ButtonWidgetCategoryList)
