// @flow strict-local
import reconnect from 'utils/reconnect'
import ChartCard from './ChartCard'
import {
  barChartCategoryTypeSelector,
  barChartClickableSelector,
  barChartColorSelector,
  barChartDataSelector,
  barChartOnlySelector,
  listIsUpdatingSelector,
  periodSelector,
  pieChartVisibleSelector,
  pieItemsSelector,
  pieTotalSelector,
  totalSelectableSelector,
} from './selectors'
import * as ACTIONS from './actions'

export default reconnect(
  {
    barsAreClickable: barChartClickableSelector,
    barsCategoryType: barChartCategoryTypeSelector,
    barsColor: barChartColorSelector,
    barsData: barChartDataSelector,
    barsOnly: barChartOnlySelector,
    loading: listIsUpdatingSelector,
    period: periodSelector,
    pieChartVisible: pieChartVisibleSelector,
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
