import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategories } from 'components/CategoryListPieChart'
import { pieDataProp } from 'data/models/charts'

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

const RecipientCategoryList = ({ classes, className, data }) => {
  const categories = limitCategories(5)(data)
  return (
    <CategoryList
      Classes={{
        icon: classes.icon,
        name: classes.name,
        value: classes.value,
      }}
      className={cx(classes.root, className)}
      data={categories}
    />
  )
}

RecipientCategoryList.propTypes = {
  data: pieDataProp.isRequired,
}

export default injectStyles(styles)(RecipientCategoryList)
