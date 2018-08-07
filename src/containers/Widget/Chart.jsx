import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import {
  categoricalDataSelector,
  dualDataSelector,
} from 'components/Charts/selectors'
import PieChart from '../Ledger/GraphOverviewCard/PieChart'
import { name } from './reducer'

const styles = {
  root: {},
}

const Chart = ({ categoricalData, classes, className }) => (
  <PieChart
    className={cx(classes.root, className)}
    categories={categoricalData}
  />
)

export default compose(
  connect(state => ({
    categoricalData: categoricalDataSelector(name)(state),
    dualData: dualDataSelector(name)(state),
  })),
  injectStyles(styles)
)(Chart)
