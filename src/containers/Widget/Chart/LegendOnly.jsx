import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import CategoryList from 'components/CategoryList'
import { limitCategoriesTo } from 'utils/limitCategories'
import Footer from './Footer'
import PeriodSelector from './PeriodSelector'

const styles = theme => ({
  root: {
    overflowY: 'scroll',
    margin: [0, -15, 0, 0],
    padding: [0, 15, 0, 0],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  legend: {
    margin: [0, 2, 8],
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    '&:not(:first-child)': {
      marginTop: 8,
    },
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
  seeAll: {
    marginLeft: 5,
  },
  switchers: {
    display: 'flex',
    margin: [2, 0, 17],
    '& > :not(:first-child)': {
      marginLeft: 21,
    },
  },
})

const LegendOnly = ({ classes, className, data, period }) => {
  const categoryType = 'spending' // FIXME: actually select type
  const unlimitedData = limitCategoriesTo(999)(data[categoryType])
  // TODO: support less than 4 items (align legend to top)
  return (
    <>
      <div className={classes.switchers}>
        <PeriodSelector value={period} />
        {/* <PeriodSelector text="% of total spending" /> */}
      </div>
      <div className={cx(classes.root, className)}>
        <CategoryList
          activeKey={null}
          className={classes.legend}
          iconClassName={classes.legendIcon}
          itemClassName={classes.legendItem}
          limitedCategories={unlimitedData}
          nameClassName={classes.legendItemFont}
          tooltip
          valueClassName={classes.legendItemValue}
          valueUnit="%"
        />
        <Footer paymentCount={954} seeAllClassName={classes.seeAll} />
      </div>
    </>
  )
}

export default injectStyles(styles)(LegendOnly)
