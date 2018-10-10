import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import CategoryList, {
  categoryListProps,
  categoryListDataProps,
} from 'components/CategoryList'

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
  data,
  //
  activeCategoryIndex,
  onCategoryClick,
  onLabelMouseEnter,
  onLabelMouseLeave,
  valueUnit,
}) => (
  <CategoryList
    activeCategoryIndex={activeCategoryIndex}
    className={classes.root}
    Classes={{ item: classes.item }}
    data={data}
    onCategoryClick={onCategoryClick}
    onLabelMouseEnter={onLabelMouseEnter}
    onLabelMouseLeave={onLabelMouseLeave}
    valueUnit={valueUnit}
  />
)

LedgerCategoryList.propTypes = {
  ...categoryListProps,
  data: categoryListDataProps.isRequired,
}

export default injectStyles(styles)(LedgerCategoryList)
