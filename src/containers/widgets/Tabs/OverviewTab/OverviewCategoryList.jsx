// @flow
import React from 'react'
import cx from 'classnames'
import {
  CategoryList,
  type CategoryListProps,
} from 'components/OverviewPieChart'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    left: '-2%',
  },
  item: {
    paddingBottom: 5,
  },
  icon: {
    height: 14,
    width: 14,
  },
  name: {
    ...theme.fontMedium(18, 26),
  },
  value: {
    ...theme.fontRegular(18, 26),
  },
})

type Props = {|
  ...CategoryListProps,
  ...InjectStylesProps,
|}

const OverviewCategoryList = ({ classes, className, ...props }: Props) => (
  <CategoryList
    className={cx(classes.root, className)}
    iconClassName={classes.icon}
    itemClassName={classes.item}
    nameClassName={classes.name}
    valueClassName={classes.value}
    {...props}
  />
)

export default injectStyles(styles)(OverviewCategoryList)
