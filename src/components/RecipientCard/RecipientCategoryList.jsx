// @flow
import React from 'react'
import cx from 'classnames'
import CategoryList from 'components/CategoryList'
import {
  limitCategories,
  type Categories,
} from 'components/CategoryListPieChart'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

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

type Props = {|
  ...InjectStylesProps,
  //
  data: Categories,
|}

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
