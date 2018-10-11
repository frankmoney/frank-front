import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList, {
  categoryListProps,
  categoryListDataProps,
} from 'components/CategoryList'

const styles = theme => ({
  root: {
    order: 4,
    padding: [1, 2, 0, 0],
    position: 'static',
  },
  item: {
    padding: [15, 0, 18],
    '&:not(:last-child)': {
      borderBottom: '1px solid #F2F2F4',
    },
  },
  icon: {
    height: 14,
    width: 14,
  },
  name: {
    flexGrow: 1,
    ...theme.fontMedium(18, 26),
  },
  value: {
    ...theme.fontRegular(18, 26),
  },
})

const ButtonWidgetCategoryList = ({
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
      icon: classes.icon,
      item: classes.item,
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

ButtonWidgetCategoryList.propTypes = {
  ...categoryListProps,
  data: categoryListDataProps.isRequired,
}

export default injectStyles(styles)(ButtonWidgetCategoryList)
