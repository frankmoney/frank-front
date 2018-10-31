// @flow
import React from 'react'
import cx from 'classnames'
import CategoryList, { type CategoryListProps } from 'components/CategoryList'
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

const OverviewCategoryList = ({
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

export default injectStyles(styles)(OverviewCategoryList)
