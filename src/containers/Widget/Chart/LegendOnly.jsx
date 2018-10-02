import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import ConnectedCategoryTypeSelect from 'containers/Widget/ConnectedCategoryTypeSelect'
import { limitCategoriesTo } from 'data/models/categories'
import { pieDataProp } from 'data/models/charts'

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
    cursor: 'pointer',
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
        Classes={{
          icon: classes.legendIcon,
          item: classes.legendItem,
          name: classes.legendItemName,
          root: classes.legend,
          value: classes.legendItemValue,
        }}
        data={limitedCategories}
        onCategoryClick={onCategoryClick}
        tooltip
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
