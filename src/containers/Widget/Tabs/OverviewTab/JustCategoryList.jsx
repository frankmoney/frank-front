// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategories } from 'components/CategoryListPieChart'
import type { CategoryHandler } from 'components/CategoryList/types'
import type { PieData } from 'components/Charts/types'

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

type Props = {
  data: PieData,
  onCategoryClick: CategoryHandler,
}

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
