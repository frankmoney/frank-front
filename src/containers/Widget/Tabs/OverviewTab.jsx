import React from 'react'
import PropTypes from 'prop-types'
import { pieDataProp } from 'data/models/charts'
import OverviewChart, { Footer, LegendOnly } from '../Chart'
import Totals from '../Totals'

const OverviewTab = ({
  categoryCount,
  categoryType,
  chartClassName,
  contentClassName,
  data,
  dontWrapPiechart,
  onCategoryClick,
  onCategoryTypeChange,
  onSeeAllClick,
  paymentCount,
  size,
  showTotals,
}) => {
  const categories = data[categoryType] // TODO: move to selector?
  return (
    <div className={contentClassName}>
      {showTotals && <Totals />}
      {size > 400 ? (
        <OverviewChart
          categoryType={categoryType}
          className={chartClassName}
          data={categories}
          dontWrapPiechart={dontWrapPiechart}
          onCategoryClick={onCategoryClick}
          onCategoryTypeChange={onCategoryTypeChange}
          size={size}
        />
      ) : (
        <LegendOnly data={categories} onCategoryClick={onCategoryClick} />
      )}
      <Footer
        paymentCount={paymentCount}
        categoryCount={categoryCount}
        onSeeAllClick={onSeeAllClick}
      />
    </div>
  )
}

OverviewTab.propTypes = {
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  data: PropTypes.objectOf(pieDataProp),
  dontWrapPiechart: PropTypes.bool,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  paymentCount: PropTypes.number,
  size: PropTypes.number.isRequired,
  showTotals: PropTypes.bool,
  // Styles
  contentClassName: PropTypes.string,
  chartClassName: PropTypes.string,
}

export default OverviewTab
