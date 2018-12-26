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
  totalSelectableSelector,
  listIsUpdatingSelector,
} from './selectors'
import * as ACTIONS from './actions'

export default compose(
  reconnect(
    {
      barsAreClickable: barChartClickableSelector,
      barsColor: barChartColorSelector,
      barsData: barChartDataSelector,
      barsOnly: barChartOnlySelector,
      loading: listIsUpdatingSelector,
      period: periodSelector,
      pieItems: pieItemsSelector,
      pieTotal: pieTotalSelector,
      pieTotalSelectable: totalSelectableSelector,
      visible: chartsVisibleSelector,
    },
    {
      onBarsZoomIn: ACTIONS.barZoomIn,
      onCategoryClick: ACTIONS.selectCategory,
      onPieTotalChange: ACTIONS.selectPieTotal,
    }
  ),
  branch(props => !props.visible, renderNothing)
)(ChartCard)
