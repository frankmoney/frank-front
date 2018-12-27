// @flow strict-local
import React from 'react'
import cx from 'classnames'
import {
  CategoryList,
  type CategoryListProps,
} from 'components/OverviewPieChart'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: {
    flex: 1,
    position: 'unset',
  },
  item: {
    paddingBottom: 6,
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

type Props = {|
  ...CategoryListProps,
  ...InjectStylesProps,
|}

const LedgerCategoryList = ({ classes, className, ...props }: Props) => (
  <CategoryList
    className={cx(classes.root, className)}
    itemClassName={classes.item}
    iconClassName={classes.icon}
    nameClassName={classes.name}
    valueClassName={classes.value}
    {...props}
  />
)

export default injectStyles(styles)(LedgerCategoryList)
