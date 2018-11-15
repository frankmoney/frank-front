// @flow
import type { CategoryCb } from 'components/CategoryList'
import type { BarData } from 'components/Charts/Bar'
import type { GroupedPieData } from 'data/models/pieData'

export type Props = {
  barsData: BarData,
  barsOnly: boolean,
  categoryType: string,
  period: string,
  pieData: GroupedPieData,
  // Handlers
  onCategoryClick: ?CategoryCb,
  onCategoryTypeChange: ?CategoryCb,
  // Styles
  classes: Object,
  className: ?string,
}

export type State = {
  expanded: boolean,
}
