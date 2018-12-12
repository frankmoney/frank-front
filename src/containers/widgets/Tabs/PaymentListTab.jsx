// @flow strict-local
import React from 'react'
import cx from 'classnames'
import Bar from 'components/Charts/Bar'
import Payments from 'containers/widgets/Payments'
import { injectStyles } from 'utils/styles'
import PeriodSelect from '../PeriodSelect'
import { CategoryName, Header } from '../TabbedLayout/Header'
import type { Props } from './PaymentListTab.flow'

const styles = {
  content: {
    overflowY: 'scroll',
  },
}

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
  paymentsPeriodClassName,
  showBarChart,
  showCategories,
  // period select
  onPeriodChange,
  period,
  periods,
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
          <PeriodSelect
            className={paymentsPeriodClassName}
            onPeriodChange={onPeriodChange}
            period={period}
            periods={periods}
          />
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
