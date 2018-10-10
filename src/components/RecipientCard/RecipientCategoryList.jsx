import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategoriesTo } from 'data/models/categories'
import { pieDataProp } from 'data/models/charts'

const styles = theme => ({
  root: {
    paddingTop: 8,
  },
  icon: {
    height: 12,
    width: 12,
  },
  name: {
    ...theme.fontMedium(18, 28),
  },
  value: {
    ...theme.fontRegular(18, 28),
    color: '#BEBFC7',
  },
})

const RecipientCategoryList = ({ classes, data }) => {
  const categories = limitCategoriesTo(5)(data)
  return (
    <CategoryList
      Classes={{
        icon: classes.icon,
        name: classes.name,
        root: classes.root,
        value: classes.value,
      }}
      data={categories}
    />
  )
}

RecipientCategoryList.propTypes = {
  data: pieDataProp.isRequired,
}

export default injectStyles(styles)(RecipientCategoryList)
