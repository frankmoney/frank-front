import { connect } from 'react-redux'
import * as R from 'ramda'
import { branch, compose, renderNothing } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import GraphOverviewCard from './GraphOverviewCard'
import {
  barChartDataSelector,
  barChartOnlySelector,
  chartCategoryTypeSelector,
  chartsVisibleSelector,
  pieChartDataSelector,
} from './selectors'
import * as ACTIONS from './actions'

const mapStateToProps = createStructuredSelector({
  barsData: barChartDataSelector,
  barsOnly: barChartOnlySelector,
  categoryType: chartCategoryTypeSelector,
  pieData: pieChartDataSelector,
  visible: chartsVisibleSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onCategoryClick: ACTIONS.selectCategory,
    onCategoryTypeChange: ACTIONS.selectCategoryType,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(props => !props.visible, renderNothing)
)(GraphOverviewCard)
