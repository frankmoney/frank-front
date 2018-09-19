import React from 'react'
import PropTypes from 'prop-types'
import PeriodSelector from 'components/LegendPieChart/PeriodSelector'
import Bar from 'components/Charts/Bar'
import { barChartDataShape } from 'components/Charts/shapes'
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
  onPeriodChange,
  paymentsClassName,
  paymentsPeriodClassName,
  period,
  periods,
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
          <PeriodSelector
            className={paymentsPeriodClassName}
            onChange={onPeriodChange}
            value={period}
            values={periods}
          />
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
  barsData: PropTypes.arrayOf(barChartDataShape),
  barsHeight: PropTypes.number.isRequired,
  barsWidth: PropTypes.number.isRequired,
  onCancelCategoryClick: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  showBarChart: PropTypes.bool,
  // Styles
  barChartClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  paymentsClassName: PropTypes.string,
  paymentsPeriodClassName: PropTypes.string,
}

export default PaymentListTab
