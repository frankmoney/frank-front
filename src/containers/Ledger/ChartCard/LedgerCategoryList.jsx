// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import type { Props } from 'components/CategoryList/types'

const styles = {
  root: {
    left: -26,
    paddingBottom: 5,
  },
  item: {
    '&:not(:last-child)': {
      paddingBottom: 10,
    },
  },
}

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
