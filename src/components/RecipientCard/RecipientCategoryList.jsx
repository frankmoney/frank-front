// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategories } from 'components/CategoryListPieChart'
import type { PieData } from 'components/Charts/Pie'

const styles = theme => ({
  root: {
    paddingTop: 8,
  },
  icon: {
    marginRight: 9,
    height: 12,
    width: 12,
  },
  name: {
    ...theme.fontMedium(18, 28),
  },
  value: {
    ...theme.fontRegular(18, 28),
    color: '#BEBFC7',
    opacity: 1,
  },
})

type Props = {
  classes: Object,
  className: ?string,
  data: PieData,
}

const RecipientCategoryList = ({ classes, className, data }: Props) => {
  const categories = limitCategories(5)(data)
  return (
    <CategoryList
      className={cx(classes.root, className)}
      data={categories}
      iconClassName={classes.icon}
      nameClassName={classes.name}
      valueClassName={classes.value}
    />
  )
}

export default injectStyles(styles)(RecipientCategoryList)
