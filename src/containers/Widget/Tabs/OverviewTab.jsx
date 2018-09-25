import React from 'react'
import PropTypes from 'prop-types'
import { pieDataProp } from 'data/models/charts'
import OverviewChart, { Footer } from '../Chart'

const OverviewTab = ({
  categoryCount,
  categoryType,
  contentClassName,
  data,
  onCategoryClick,
  onCategoryTypeChange,
  onPeriodChange,
  onSeeAllClick,
  paymentCount,
  period,
  periods,
  size,
}) => (
  <div className={contentClassName}>
    <OverviewChart
      categoryType={categoryType}
      data={data}
      onCategoryClick={onCategoryClick}
      onCategoryTypeChange={onCategoryTypeChange}
      onPeriodChange={onPeriodChange}
      period={period}
      periods={periods}
      size={size}
    />
    <Footer
      paymentCount={paymentCount}
      categoryCount={categoryCount}
      onSeeAllClick={onSeeAllClick}
    />
  </div>
)

OverviewTab.propTypes = {
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  data: PropTypes.objectOf(pieDataProp),
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  paymentCount: PropTypes.number,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.number.isRequired,
  // Styles
  contentClassName: PropTypes.string,
}

export default OverviewTab
