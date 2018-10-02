import React from 'react'
import PropTypes from 'prop-types'
import OverviewChart, { LegendOnly } from 'containers/Widget/Chart'
import Totals from 'containers/Widget/Totals'
import Footer, { footerClasses, footerProps } from 'containers/Widget/Footer'
import { pieDataProp } from 'data/models/charts'

const OverviewTab = ({
  categoryCount,
  categoryListClassName,
  categoryType,
  chartClassName,
  contentClassName,
  data,
  dontWrapPiechart,
  FooterClasses,
  FooterProps,
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
        categoryCount={categoryCount}
        onSeeAllClick={onSeeAllClick}
        paymentCount={paymentCount}
        {...FooterClasses}
        {...FooterProps}
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
  chartClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  pieClassName: PropTypes.string,
  //
  FooterClasses: footerClasses,
  FooterProps: footerProps,
}

export default OverviewTab
