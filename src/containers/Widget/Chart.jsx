import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import {
  categoricalDataSelector,
  dualDataSelector,
} from 'components/Charts/selectors'
import { categoricalDataShape } from 'components/Charts/shapes'
import PieChart from '../Ledger/GraphOverviewCard/PieChart'
import { name } from './reducer'

const styles = {
  root: {
    padding: [0, 6],
  },
}

const pieChartSize = R.cond([
  [R.equals(500), R.always(170)],
  [R.equals(625), R.always(220)],
  [R.equals(800), R.always(275)],
  [R.T, R.always(0)],
])

const Chart = ({ categoricalData, classes, className, size }) => (
  <PieChart
    hideChart={size === 400}
    chartSize={pieChartSize(size)}
    className={cx(classes.root, className)}
    categories={categoricalData}
  />
)

Chart.propTypes = {
  categoricalData: PropTypes.arrayOf(categoricalDataShape),
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default compose(
  connect(state => ({
    categoricalData: categoricalDataSelector(name)(state),
    dualData: dualDataSelector(name)(state),
  })),
  injectStyles(styles)
)(Chart)
