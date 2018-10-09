import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategoriesTo } from 'data/models/categories'
import { pieDataProp } from 'data/models/charts'

const styles = theme => ({
  root: {
    padding: [10, 2],
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
  },
  item: {
    display: 'flex',
    padding: [4, 0],
    cursor: 'pointer',
  },
  name: {
    ...theme.fontMedium(18, 26),
    flexGrow: 1,
  },
  value: {
    ...theme.fontRegular(18, 26),
  },
  icon: {
    height: 14,
    width: 14,
  },
})

const JustCategoryList = ({ classes, data, onCategoryClick }) => {
  const limitedCategories = limitCategoriesTo(999)(data)
  return (
    <CategoryList
      Classes={{
        icon: classes.icon,
        item: classes.item,
        name: classes.name,
        root: classes.root,
        value: classes.value,
      }}
      data={limitedCategories}
      onCategoryClick={onCategoryClick}
      tooltip
      valueUnit="%"
    />
  )
}

JustCategoryList.propTypes = {
  data: pieDataProp.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
}

export default injectStyles(styles)(JustCategoryList)
