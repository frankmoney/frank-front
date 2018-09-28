import React from 'react'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PeriodSelector from 'components/CategoryListPieChart/PeriodSelector'
import { periodSelector, periodsSelector } from './selectors'
import * as ACTIONS from './actions'

const ConnectedPeriodSelect = ({ className, onChange, period, periods }) => (
  <PeriodSelector
    className={className}
    onChange={onChange}
    value={period}
    values={periods}
  />
)

const mapStateToProps = createStructuredSelector({
  period: periodSelector,
  periods: periodsSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onChange: ACTIONS.selectPeriod,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedPeriodSelect)
