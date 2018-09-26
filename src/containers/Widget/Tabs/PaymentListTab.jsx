import React from 'react'
import PropTypes from 'prop-types'
import Bar from 'components/Charts/Bar'
import { barDataProp } from 'data/models/charts'
import ConnectedPeriodSelect from '../ConnectedPeriodSelect'
import Payments from '../Payments'
import { Header, CategoryName } from '../Header'

const PaymentListTab = ({
  barChartClassName,
  barsData,
  barsHeight,
  barsWidth,
  contentClassName,
  currentCategoryColor,
  currentCategoryName,
  onCancelCategoryClick,
  paymentsClassName,
  paymentsPeriodClassName,
  showBarChart,
}) => (
  <>
    <Header live={false}>
      <CategoryName
        name={currentCategoryName}
        onClick={() => onCancelCategoryClick()}
      />
    </Header>
    <div className={contentClassName}>
      {showBarChart && (
        <>
          <ConnectedPeriodSelect className={paymentsPeriodClassName} />
          <Bar
            barColor={currentCategoryColor}
            className={barChartClassName}
            data={barsData}
            footerPadding={10}
            height={barsHeight}
            hideBaseLine
            labelKey="date"
            width={barsWidth}
          />
        </>
      )}
      <Payments className={paymentsClassName} />
    </div>
  </>
)

PaymentListTab.propTypes = {
  barsData: barDataProp,
  barsHeight: PropTypes.number.isRequired,
  barsWidth: PropTypes.number.isRequired,
  onCancelCategoryClick: PropTypes.func.isRequired,
  showBarChart: PropTypes.bool,
  // Styles
  barChartClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  paymentsClassName: PropTypes.string,
  paymentsPeriodClassName: PropTypes.string,
}

export default PaymentListTab
