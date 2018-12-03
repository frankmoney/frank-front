// @flow strict-local
import { branch, compose, renderNothing } from 'recompose'
import reconnect from 'utils/reconnect'
import ChartCard from './ChartCard'
import {
  barChartClickableSelector,
  barChartColorSelector,
  barChartDataSelector,
  barChartOnlySelector,
  categoryTypeSelector,
  chartsVisibleSelector,
  periodSelector,
  pieChartDataSelector,
} from './selectors'
import * as ACTIONS from './actions'

export default compose(
  reconnect(
    {
      barsAreClickable: barChartClickableSelector,
      barsColor: barChartColorSelector,
      barsData: barChartDataSelector,
      barsOnly: barChartOnlySelector,
      categoryType: categoryTypeSelector,
      period: periodSelector,
      pieData: pieChartDataSelector,
      visible: chartsVisibleSelector,
    },
    {
      onCategoryClick: ACTIONS.selectCategory,
      onCategoryTypeChange: ACTIONS.selectCategoryType,
      onBarsZoomIn: ACTIONS.barZoomIn,
    }
  ),
  branch(props => !props.visible, renderNothing)
)(ChartCard)
