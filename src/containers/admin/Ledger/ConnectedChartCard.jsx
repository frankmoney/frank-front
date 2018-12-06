// @flow strict-local
import { branch, compose, renderNothing } from 'recompose'
import reconnect from 'utils/reconnect'
import ChartCard from './ChartCard'
import {
  barChartClickableSelector,
  barChartColorSelector,
  barChartDataSelector,
  barChartOnlySelector,
  chartsVisibleSelector,
  periodSelector,
  pieItemsSelector,
  pieTotalSelector,
} from './selectors'
import * as ACTIONS from './actions'

export default compose(
  reconnect(
    {
      barsAreClickable: barChartClickableSelector,
      barsColor: barChartColorSelector,
      barsData: barChartDataSelector,
      barsOnly: barChartOnlySelector,
      categoryType: pieTotalSelector,
      period: periodSelector,
      pieItems: pieItemsSelector,
      visible: chartsVisibleSelector,
    },
    {
      onCategoryClick: ACTIONS.selectCategory,
      onCategoryTypeChange: ACTIONS.selectPieTotal,
      onBarsZoomIn: ACTIONS.barZoomIn,
    }
  ),
  branch(props => !props.visible, renderNothing)
)(ChartCard)
