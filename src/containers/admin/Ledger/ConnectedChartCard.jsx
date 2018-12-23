// @flow strict-local
import reconnect from 'utils/reconnect'
import ChartCard from './ChartCard'
import {
  barChartClickableSelector,
  barChartColorSelector,
  barChartDataSelector,
  barChartOnlySelector,
  periodSelector,
  pieItemsSelector,
  pieTotalSelector,
  totalSelectableSelector,
} from './selectors'
import * as ACTIONS from './actions'

export default reconnect(
  {
    barsAreClickable: barChartClickableSelector,
    barsColor: barChartColorSelector,
    barsData: barChartDataSelector,
    barsOnly: barChartOnlySelector,
    period: periodSelector,
    pieItems: pieItemsSelector,
    pieTotal: pieTotalSelector,
    pieTotalSelectable: totalSelectableSelector,
  },
  {
    onBarsZoomIn: ACTIONS.barZoomIn,
    onCategoryClick: ACTIONS.selectCategory,
    onPieTotalChange: ACTIONS.selectPieTotal,
  }
)(ChartCard)
