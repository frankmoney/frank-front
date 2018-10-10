import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategories } from 'components/CategoryListPieChart'
import { pieDataProp } from 'data/models/charts'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: [1, 0, 'auto'],
    flexDirection: 'column',
    padding: [13, 2],
  },
  item: {
    '&:not(:last-child)': {
      paddingBottom: 9,
    },
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
  const limitedCategories = limitCategories(999)(data)
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
      valueUnit="%"
    />
  )
}

JustCategoryList.propTypes = {
  data: pieDataProp.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
}

export default injectStyles(styles)(JustCategoryList)
