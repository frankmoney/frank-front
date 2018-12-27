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
    '&:not(:last-child)': {
      paddingBottom: 9,
    },
  },
  name: {
    ...theme.fontMedium(18, 26),
    flexGrow: 1,
  },
  value: {
    ...theme.fontRegular(18, 26),
  },
  icon: {
    height: 14,
    width: 14,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  pieItems: PieChartCategories,
  onCategoryClick: CategoryCb,
|}

const JustCategoryList = ({
  classes,
  className,
  pieItems,
  ...props
}: Props) => {
  const limitedCategories = limitCategories(999)(pieItems)
  return (
    <CategoryList
      className={cx(classes.root, className)}
      data={limitedCategories}
      iconClassName={classes.icon}
      itemClassName={classes.item}
      nameClassName={classes.name}
      valueClassName={classes.value}
      valueUnit="%"
      {...props}
    />
  )
}

export default injectStyles(styles)(JustCategoryList)
