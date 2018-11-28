// @flow strict-local
import React from 'react'
import cx from 'classnames'
import {
  CategoryList,
  limitCategories,
  type Categories,
  type CategoryCb,
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
  data: Categories,
  onCategoryClick: CategoryCb,
|}

const JustCategoryList = ({
  classes,
  className,
  data,
  onCategoryClick,
}: Props) => {
  const limitedCategories = limitCategories(999)(data)
  return (
    <CategoryList
      className={cx(classes.root, className)}
      data={limitedCategories}
      iconClassName={classes.icon}
      itemClassName={classes.item}
      nameClassName={classes.name}
      onCategoryClick={onCategoryClick}
      valueClassName={classes.value}
      valueUnit="%"
    />
  )
}

export default injectStyles(styles)(JustCategoryList)
