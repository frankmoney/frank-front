// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import Bar, { type BarData } from 'components/Charts/Bar'
import Payments, { type PaymentsProps } from 'containers/widgets/Payments'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { CategoryName, Header } from '../TabbedLayout/Header'

const styles = {
  content: {
    overflowY: 'scroll',
  },
  periodSelect: {
    flex: [1, 0],
    display: 'flex',
    margin: [4, 0, 14, 2],
  },
}

type Props = {|
  ...InjectStylesProps,
  ...PaymentsProps,
  //
  currentCategoryColor: string,
  currentCategoryName: string,
  barsData?: BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  showBarChart: boolean,
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
  PeriodSelect: ?React.Element<any>, // flowlint-line unclear-type:off
|}

const PaymentListTab = ({
  barChartClassName,
  barsData,
  barsHeight,
  barsWidth,
  classes,
  contentClassName,
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
  PeriodSelect,
}: Props) => (
  <>
    <Header live={false}>
      <CategoryName
        name={currentCategoryName}
        onClick={onCancelCategoryClick}
      />
    </Header>
    <div className={cx(classes.content, contentClassName)}>
      {showBarChart && (
        <>
          {PeriodSelect &&
            React.cloneElement(PeriodSelect, {
              className: classes.periodSelect,
            })}
          <Bar
            barColor={currentCategoryColor}
            className={barChartClassName}
            data={barsData}
            footerPadding={footerPadding}
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

export default injectStyles(styles)(PaymentListTab)
