import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList, {
  categoryListProps,
  categoryListDataProps,
} from 'components/CategoryList'

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
}) => (
  <CategoryList
    activeCategoryIndex={activeCategoryIndex}
    Classes={{
      item: classes.item,
      icon: classes.icon,
      name: classes.name,
      value: classes.value,
    }}
    className={cx(classes.root, className)}
    data={data}
    onCategoryClick={onCategoryClick}
    onLabelMouseEnter={onLabelMouseEnter}
    onLabelMouseLeave={onLabelMouseLeave}
    valueUnit={valueUnit}
  />
)

OverviewCategoryList.propTypes = {
  ...categoryListProps,
  data: categoryListDataProps.isRequired,
}

export default injectStyles(styles)(OverviewCategoryList)
