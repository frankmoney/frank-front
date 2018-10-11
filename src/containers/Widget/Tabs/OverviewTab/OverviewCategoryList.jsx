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

OverviewCategoryList.propTypes = {
  ...categoryListProps,
  data: categoryListDataProps.isRequired,
}

export default injectStyles(styles)(OverviewCategoryList)
