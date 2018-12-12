// @flow strict-local
import type { BarData } from 'components/Charts/Bar'
import type { InjectStylesProps } from 'utils/styles'
import type { PaymentsProps } from '../Payments'
import type { PeriodSelectProps } from '../PeriodSelect'

type EmptyCb = () => void

export type Props = {|
  ...InjectStylesProps,
  ...PaymentsProps,
  ...PeriodSelectProps,
  //
  currentCategoryColor: string,
  currentCategoryName: string,
  barsData?: BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  showBarChart: boolean,
  // Handlers
  onCancelCategoryClick: EmptyCb,
  // Styles
  barChartClassName?: string,
  contentClassName?: string,
  paymentBlockClassName?: string,
  paymentBlockTitleClassName?: string,
  paymentClassName?: string,
  paymentListClassName?: string,
  paymentsPeriodClassName?: string,
|}
