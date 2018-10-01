import React from 'react'
import PropTypes from 'prop-types'
import { pieDataProp } from 'data/models/charts'
import OverviewChart, { Footer, LegendOnly } from '../Chart'
import Totals from '../Totals'

const OverviewTab = ({
  categoryCount,
  categoryListClassName,
  categoryType,
  chartClassName,
  contentClassName,
  data,
  dontWrapPiechart,
  onCategoryClick,
  onCategoryTypeChange,
  onSeeAllClick,
  paymentCount,
  pieClassName,
  showTotals,
  widgetSize,
}) => {
  const categories = data[categoryType] // TODO: move to selector?
  return (
    <div className={contentClassName}>
      {showTotals && <Totals />}
      {widgetSize !== 400 ? (
        <OverviewChart
          categoryListClassName={categoryListClassName}
          categoryType={categoryType}
          pieClassName={pieClassName}
          className={chartClassName}
          data={categories}
          dontWrapPiechart={dontWrapPiechart}
          onCategoryClick={onCategoryClick}
          onCategoryTypeChange={onCategoryTypeChange}
          widgetSize={widgetSize}
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
  showTotals: PropTypes.bool,
  widgetSize: PropTypes.number.isRequired,
  // Styles
  categoryListClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  chartClassName: PropTypes.string,
  pieClassName: PropTypes.string,
}

export default OverviewTab
