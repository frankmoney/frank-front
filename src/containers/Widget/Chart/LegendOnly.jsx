import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { limitCategoriesTo } from 'data/models/categories'
import CategoryList from 'components/CategoryList'
import { pieDataProp } from 'data/models/charts'

// FIXME: styles
const styles = theme => ({
  root: {
    marginBottom: 5,
    paddingTop: 5,
    display: 'block',
  },
  periodSelect: {
    display: 'inline-block',
    position: 'relative',
    top: 'unset',
    left: 2,
  },
  switcherContainer: {
    display: 'inline-block',
    height: 'auto',
    width: 'auto',
    marginLeft: 29,
  },
  switcher: {
    position: 'unset',
    transform: 'none',
  },
  legend: {
    padding: [10, 2],
    width: '100%',
    minHeight: 128, // fixes case of too few lines
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    padding: [4, 0],
    position: 'relative',
  },
  legendItemFont: {
    ...theme.fontMedium(18, 26),
  },
  legendItemValue: {
    position: 'absolute',
    right: 0,
    ...theme.fontRegular(18, 26),
  },
  legendIcon: {
    height: 14,
    width: 14,
  },
})

// TODO: actually move inside OverviewTab?
const LegendOnly = ({ classes, data, onCategoryClick }) => {
  const limitedCategories = limitCategoriesTo(999)(data)
  return (
    <CategoryList
      className={classes.legend}
      iconClassName={classes.legendIcon}
      itemClassName={classes.legendItem}
      data={limitedCategories}
      nameClassName={classes.legendItemFont}
      onCategoryClick={onCategoryClick}
      tooltip
      valueClassName={classes.legendItemValue}
      valueUnit="%"
    />
  )
}

LegendOnly.propTypes = {
  data: pieDataProp.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
}

export default injectStyles(styles)(LegendOnly)
