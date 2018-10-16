// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Bar from 'components/Charts/Bar'
import type { BarData } from 'components/Charts/types'
import { CategoryName, Header } from 'containers/Widget/Header'
import Payments from 'containers/Widget/Payments'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'

const styles = {
  content: {
    overflowY: 'scroll',
  },
}

type Classes = {
  barChartClassName: ?string,
  contentClassName: ?string,
  paymentBlockClassName: ?string,
  paymentBlockTitleClassName: ?string,
  paymentClassName: ?string,
  paymentListClassName: ?string,
  paymentsPeriodClassName: ?string,
}

type Props = {
  barsData: ?BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  onCancelCategoryClick: () => void,
  showBarChart: boolean,
} & Classes

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
        onClick={() => onCancelCategoryClick()}
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
