import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { limitCategoriesTo } from 'data/models/categories'
import CategoryList from 'components/CategoryList'
import { pieDataProp } from 'data/models/charts'
import ConnectedPeriodSelect from '../ConnectedPeriodSelect'
import ConnectedCategoryTypeSelect from '../ConnectedCategoryTypeSelect'

const styles = theme => ({
  selectors: {
    display: 'flex',
    flexShrink: 0,
    margin: [6, 0, -1, 2],
  },
  categoryType: {
    marginLeft: 27,
  },
  legend: {
    padding: [10, 2],
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
  },
  legendItem: {
    display: 'flex',
    padding: [4, 0],
  },
  legendItemName: {
    ...theme.fontMedium(18, 26),
    flexGrow: 1,
  },
  legendItemValue: {
    ...theme.fontRegular(18, 26),
  },
  legendIcon: {
    height: 14,
    width: 14,
  },
})

const LegendOnly = ({ classes, data, onCategoryClick }) => {
  const limitedCategories = limitCategoriesTo(999)(data)
  return (
    <>
      <div className={classes.selectors}>
        <ConnectedPeriodSelect />
        <ConnectedCategoryTypeSelect className={classes.categoryType} />
      </div>
      <CategoryList
        className={classes.legend}
        iconClassName={classes.legendIcon}
        itemClassName={classes.legendItem}
        data={limitedCategories}
        nameClassName={classes.legendItemName}
        onCategoryClick={onCategoryClick}
        tooltip
        valueClassName={classes.legendItemValue}
        valueUnit="%"
      />
    </>
  )
}

LegendOnly.propTypes = {
  data: pieDataProp.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
}

export default injectStyles(styles)(LegendOnly)
