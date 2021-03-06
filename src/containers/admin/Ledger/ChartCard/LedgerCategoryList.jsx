// @flow
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
    paddingTop: 5,
  },
  item: {
    paddingBottom: 10,
  },
}

type Props = {|
  ...CategoryListProps,
  ...InjectStylesProps,
|}

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
    onCategoryClick={onCategoryClick}
    onLabelMouseEnter={onLabelMouseEnter}
    onLabelMouseLeave={onLabelMouseLeave}
    valueUnit={valueUnit}
  />
)

export default injectStyles(styles)(LedgerCategoryList)
