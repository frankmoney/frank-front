import { connect } from 'react-redux'
import { branch, compose, renderNothing } from 'recompose'
import GraphOverviewCard from './GraphOverviewCard'
import {
  barChartDataSelector,
  chartsVisibleSelector,
  pieChartDataSelector,
} from './selectors'

export default compose(
  connect(state => ({
    categoricalData: pieChartDataSelector(state),
    dualData: barChartDataSelector(state),
    visible: chartsVisibleSelector(state),
  })),
  branch(props => !props.visible, renderNothing)
)(GraphOverviewCard)
