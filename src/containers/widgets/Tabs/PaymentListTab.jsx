// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import Bar, { type BarData } from 'components/Charts/Bar'
import Payments, { type PaymentsProps } from 'containers/widgets/Payments'
import PeriodSelectComponent from 'containers/widgets/PeriodSelect'
import { positiveBarValues, negativeBarValues } from 'data/models/barData'
import { type CategoryType } from 'data/models/category'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { CategoryName, Header } from '../TabbedLayout/Header'

const styles = {
  root: {
    overflowY: 'scroll',
  },
}

type Props = {|
  ...InjectStylesProps,
  ...PaymentsProps,
  //
  currentCategoryColor: string,
  currentCategoryName: string,
  barsCategoryType: ?CategoryType,
  barsData?: BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  showBarChart: boolean,
  small?: boolean,
  // Handlers
  onCancelCategoryClick: () => void,
  // Styles
  barChartClassName?: string,
  contentClassName?: string,
  paymentBlockClassName?: string,
  paymentBlockTitleClassName?: string,
  paymentClassName?: string,
  paymentListClassName?: string,
  paymentsPeriodClassName?: string,
  //
  PeriodSelect: ?React.Element<typeof PeriodSelectComponent>,
|}

const PaymentListTab = ({
  barChartClassName,
  barsCategoryType,
  barsData,
  barsHeight,
  barsWidth,
  classes,
  className,
  currentCategoryColor,
  currentCategoryName,
  footerPadding,
  onCancelCategoryClick,
  paymentBlockClassName,
  paymentBlockTitleClassName,
  paymentClassName,
  paymentListClassName,
  paymentsData,
  showBarChart,
  showCategories,
  small,
  PeriodSelect,
}: Props) => {
  const showPositiveOnly = barsCategoryType === 'revenue'
  const showNegativeOnly = barsCategoryType === 'spending'
  const trimmedData = showPositiveOnly
    ? positiveBarValues(barsData)
    : showNegativeOnly
      ? negativeBarValues(barsData)
      : barsData // should never happen
  return (
    <>
      <Header live={false} small={small}>
        <CategoryName
          name={currentCategoryName}
          onClick={onCancelCategoryClick}
        />
      </Header>
      <div className={cx(classes.root, className)}>
        {showBarChart && (
          <>
            {PeriodSelect}
            <Bar
              barColor={currentCategoryColor}
              className={barChartClassName}
              data={trimmedData}
              footerPadding={footerPadding}
              forcedTooltipLabel={showNegativeOnly ? 'Spending' : null}
              height={barsHeight}
              hideBaseLine
              labelKey="date"
              width={barsWidth}
            />
          </>
        )}
        <Payments
          blockClassName={paymentBlockClassName}
          blockTitleClassName={paymentBlockTitleClassName}
          className={paymentListClassName}
          paymentClassName={paymentClassName}
          paymentsData={paymentsData}
          showCategories={showCategories}
        />
      </div>
    </>
  )
}

export default injectStyles(styles)(PaymentListTab)
