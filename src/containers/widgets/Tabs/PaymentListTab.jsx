// @flow strict-local
import React from 'react'
import cx from 'classnames'
import Bar from 'components/Charts/Bar'
import Payments from 'containers/widgets/Payments'
import { ConnectedPeriodSelect } from 'containers/widgets/PeriodSelect'
import { injectStyles } from 'utils/styles'
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
  paymentsPeriodClassName,
  showBarChart,
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
          <ConnectedPeriodSelect className={paymentsPeriodClassName} />
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
        className={paymentListClassName}
        blockClassName={paymentBlockClassName}
        blockTitleClassName={paymentBlockTitleClassName}
        paymentClassName={paymentClassName}
      />
    </div>
  </>
)

export default injectStyles(styles)(PaymentListTab)
