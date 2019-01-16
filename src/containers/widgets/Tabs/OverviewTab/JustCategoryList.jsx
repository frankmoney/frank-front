// @flow strict-local
import React from 'react'
import cx from 'classnames'
import {
  CategoryList,
  limitCategories,
  type CategoryCb,
  type PieChartCategories,
} from 'components/OverviewPieChart'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: [1, 0, 'auto'],
    flexDirection: 'column',
    padding: [13, 2],
  },
  item: {
    ...theme.fontMedium(18, 26),
    '&:not(:last-child)': {
      paddingBottom: 9,
    },
  },
  name: {
    flexGrow: 1,
  },
  icon: {
    height: 14,
    width: 14,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  iconClassName?: string,
  itemClassName?: string,
  pieItems: PieChartCategories,
  onCategoryClick: CategoryCb,
|}

const JustCategoryList = ({
  classes,
  className,
  iconClassName,
  itemClassName,
  pieItems,
  ...props
}: Props) => {
  const limitedCategories = limitCategories(999)(pieItems)
  return (
    <CategoryList
      className={cx(classes.root, className)}
      data={limitedCategories}
      iconClassName={cx(classes.icon, iconClassName)}
      itemClassName={cx(classes.item, itemClassName)}
      nameClassName={classes.name}
      valueUnit="%"
      {...props}
    />
  )
}

export default injectStyles(styles)(JustCategoryList)
