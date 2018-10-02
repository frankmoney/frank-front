import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import Bar from 'components/Charts/Bar'
import { CategoryName, Header } from 'containers/Widget/Header'
import Payments from 'containers/Widget/Payments'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import { barDataProp } from 'data/models/charts'

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
}) => (
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

PaymentListTab.propTypes = {
  barsData: barDataProp,
  barsHeight: PropTypes.number.isRequired,
  barsWidth: PropTypes.number.isRequired,
  footerPadding: PropTypes.number.isRequired,
  onCancelCategoryClick: PropTypes.func.isRequired,
  showBarChart: PropTypes.bool,
  // Styles
  barChartClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  paymentBlockClassName: PropTypes.string,
  paymentBlockTitleClassName: PropTypes.string,
  paymentClassName: PropTypes.string,
  paymentListClassName: PropTypes.string,
  paymentsPeriodClassName: PropTypes.string,
}

export default injectStyles(styles)(PaymentListTab)
