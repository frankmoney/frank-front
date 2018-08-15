import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import PieChart from 'containers/PieChart'
import Footer from './Footer'

const styles = theme => ({
  root: {
    overflowY: 'scroll',
    margin: [0, -15, -19, 0],
    padding: [5, 15, 19, 0],
    display: 'block',
    width: 'unset',
    height: 'unset',
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
    margin: [12, 2, 18],
    width: '100%',
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    '&:not(:first-child)': {
      marginTop: 9,
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
  footer: {
    position: 'static',
  },
  seeAll: {
    marginLeft: 5,
  },
})

const LegendOnly = ({ classes, className, data, entriesCount, period }) => {
  // eslint-disable-next-line no-shadow
  const ShortFooter = ({ className, paymentCount }) => (
    <Footer
      className={cx(classes.footer, className)}
      paymentCount={paymentCount}
      seeAllClassName={classes.seeAll}
    />
  )
  // TODO: support less than 4 items (align legend to top)
  return (
    <PieChart
      categories={data}
      categoryLimit={999}
      chartClassName={classes.switcherContainer}
      className={cx(classes.root, className)}
      entriesCount={entriesCount}
      footer={ShortFooter}
      hideChart
      legendClassName={classes.legend}
      legendIconClassName={classes.legendIcon}
      legendItemClassName={classes.legendItem}
      legendNameClassName={classes.legendItemFont}
      legendValueClassName={classes.legendItemValue}
      period={period}
      periodSelectClassName={classes.periodSelect}
      switcherClassName={classes.switcher}
    />
  )
}

export default injectStyles(styles)(LegendOnly)
