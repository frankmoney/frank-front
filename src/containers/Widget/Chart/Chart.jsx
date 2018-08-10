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
import PieChart from 'containers/Ledger/GraphOverviewCard/PieChart' // TODO: refactor out
import ChartIcon from '../Chart.svg'
import { name } from '../reducer'
import Footer from './Footer'

const pieLegendMargin = R.cond([
  [R.equals(500), R.always(25)],
  [R.equals(625), R.always(30)],
  [R.equals(800), R.always(40)],
  [R.T, R.always(0)],
])

const styles = theme => ({
  chart: {
    padding: [0, 17, 2, 0],
    margin: 'auto',
  },
  legend: {
    margin: ({ size }) => `-9px 0 0 ${pieLegendMargin(size)}px`,
  },
  legendItem: {
    '&:not(:first-child)': {
      marginTop: 5,
    },
  },
  legendItemFont: {
    ...theme.fontMedium(18, 26),
  },
  legendItemValue: {
    ...theme.fontRegular(18, 26),
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
    margin: [0, 0, 13, 2],
  },
  periodExpander: {
    color: '#BCBFC9',
    left: 3,
    position: 'relative',
    top: 2,
  },
  smallSeeAll: {
    marginLeft: 5,
  },
})

const pieChartSize = R.cond([
  [R.equals(500), R.always(170)],
  [R.equals(625), R.always(220)],
  [R.equals(800), R.always(275)],
  [R.T, R.always(0)],
])

const ActualChart = ({ categoricalData, classes, period, size }) => (
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
      legendValueClassName={classes.legendItemValue}
    />
    <Footer paymentCount={954} categoryCount={5} />
  </>
)

const Chart = ({ size, ...props }) => {
  if (size > 400) {
    return <ActualChart size={size} {...props} />
  }
  // const { categoricalData, classes, period } = props
  const { classes } = props
  return (
    <div>
      TODO: legend only
      <Footer paymentCount={954} seeAllClassName={classes.smallSeeAll} />
    </div>
  )
}

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
