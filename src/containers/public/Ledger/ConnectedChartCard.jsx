// @flow strict-local
import { branch, compose, renderNothing } from 'recompose'
import reconnect from 'utils/reconnect'
import ChartCard from './ChartCard'
import {
  barChartColorSelector,
  barChartDataSelector,
  barChartOnlySelector,
  chartCategoryTypeSelector,
  chartsVisibleSelector,
  periodSelector,
  pieChartDataSelector,
} from './selectors'
import * as ACTIONS from './actions'

export default compose(
  reconnect(
    {
      barsColor: barChartColorSelector,
      barsData: barChartDataSelector,
      barsOnly: barChartOnlySelector,
      categoryType: chartCategoryTypeSelector,
      period: periodSelector,
      pieData: pieChartDataSelector,
      visible: chartsVisibleSelector,
    },
    {
      onCategoryClick: ACTIONS.selectCategory,
      onCategoryTypeChange: ACTIONS.selectCategoryType,
    }
  ),
  branch(props => !props.visible, renderNothing)
)(ChartCard)
