// @flow strict-local
import type { CategoryCb } from 'components/CategoryList'
import type { BarData } from 'components/Charts/Bar'
import type { GroupedPieData } from 'data/models/pieData'
import type { InjectStylesProps } from 'utils/styles'

export type Props = {|
  ...InjectStylesProps,
  //
  barsData: BarData,
  barsAreClickable: boolean,
  barsOnly: boolean,
  categoryType: string,
  period: string,
  pieData: GroupedPieData,
  // Handlers
  onCategoryClick?: CategoryCb,
  onCategoryTypeChange?: CategoryCb,
|}

export type State = {|
  expanded: boolean,
|}
