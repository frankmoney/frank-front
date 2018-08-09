import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { ArrowDropDown } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import {
  categoricalDataSelector,
  dualDataSelector,
} from 'components/Charts/selectors'
import { categoricalDataShape } from 'components/Charts/shapes'
import PieChart from '../Ledger/GraphOverviewCard/PieChart'
import ChartIcon from './Chart.svg'
import { name } from './reducer'

const pieLegendMargin = R.cond([
  [R.equals(500), R.always(25)],
  [R.equals(625), R.always(30)],
  [R.equals(800), R.always(40)],
  [R.T, R.always(0)],
])

const styles = theme => ({
  chart: {
    padding: [0, 9, 0, 0],
    margin: 'auto',
  },
  legend: {
    margin: ({ size }) => `-6px 0 0 ${pieLegendMargin(size)}px`,
  },
  legendItem: {
    '&:not(:first-child)': {
      marginTop: 4,
    },
  },
  legendItemFont: {
    ...theme.fontMedium(18, 26),
  },
  legendIcon: {
    height: 14,
    width: 14,
  },
  period: {
    ...theme.fontMedium(18, 26),
    color: '#252B43',
    cursor: 'pointer',
    display: 'flex',
    left: -4,
    marginBottom: 13,
    position: 'relative',
  },
  periodExpander: {
    color: '#BCBFC9',
    left: 3,
    position: 'relative',
    top: 2,
  },
  footer: {
    display: 'flex',
    lineHeight: 20,
    marginTop: 20,
    padding: [0, 1, 0, 2],
    justifyContent: 'space-between',
  },
  footerContent: {
    color: '#9295A1',
    alignItems: 'center',
    display: 'flex',
    whiteSpace: 'pre',
  },
  footerIcon: {
    color: '#252B43',
    marginRight: 14,
  },
  footerNumber: {
    color: '#252B43',
  },
  seeAll: {
    marginLeft: 10,
    color: '#484DE7',
    cursor: 'pointer',
  },
  verified: {
    color: '#9295A1',
  },
  frank: {
    color: '#252B43',
  },
})

const pieChartSize = R.cond([
  [R.equals(500), R.always(170)],
  [R.equals(625), R.always(220)],
  [R.equals(800), R.always(275)],
  [R.T, R.always(0)],
])

const Chart = ({ categoricalData, classes, period, size }) => (
  <>
    <div className={classes.period}>
      {period}
      <ArrowDropDown className={classes.periodExpander} />
    </div>
    <PieChart
      categories={categoricalData}
      chartSize={pieChartSize(size)}
      className={classes.chart}
      hideChart={size === 400}
      legendClassName={classes.legend}
      legendIconClassName={classes.legendIcon}
      legendItemClassName={classes.legendItem}
      legendNameClassName={classes.legendItemFont}
      legendValueClassName={classes.legendItemFont}
    />
    <div className={classes.footer}>
      <div className={classes.footerContent}>
        <ChartIcon className={classes.footerIcon} />
        <span className={classes.footerNumber}>{954}</span>
        {' payments in '}
        <span className={classes.footerNumber}>{5}</span>
        {' categories'}
        <a className={classes.seeAll}>See all</a>
      </div>
      <div className={classes.verified}>
        Verified by <span className={classes.frank}>Frank</span>
      </div>
    </div>
  </>
)

Chart.propTypes = {
  categoricalData: PropTypes.arrayOf(categoricalDataShape),
  period: PropTypes.string,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default compose(
  connect(state => ({
    categoricalData: categoricalDataSelector(name)(state),
    dualData: dualDataSelector(name)(state),
  })),
  injectStyles(styles)
)(Chart)
