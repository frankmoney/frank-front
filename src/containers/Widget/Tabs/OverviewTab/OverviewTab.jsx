import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { pieDataProp } from 'components/Charts/types'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import ConnectedCategoryTypeSelect from 'containers/Widget/ConnectedCategoryTypeSelect'
import Totals from 'containers/Widget/Totals'
import Footer, { footerClasses, footerProps } from 'containers/Widget/Footer'
import JustCategoryList from './JustCategoryList'
import OverviewChart from './OverviewChart'

const styles = {
  selects: {
    display: 'flex',
    flexShrink: 0,
    margin: [6, 0, -1, 2],
  },
  categoryType: {
    marginLeft: 27,
  },
}

const OverviewTab = ({
  categoryCount,
  CategoryList,
  categoryType,
  chartClassName,
  classes,
  contentClassName,
  data,
  FooterClasses,
  FooterProps,
  onCategoryClick,
  onCategoryTypeChange,
  onSeeAllClick,
  paymentCount,
  pieChartRootComponent,
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
          CategoryList={CategoryList}
          categoryType={categoryType}
          pieClassName={pieClassName}
          className={chartClassName}
          data={categories}
          pieChartRootComponent={pieChartRootComponent}
          onCategoryClick={onCategoryClick}
          onCategoryTypeChange={onCategoryTypeChange}
          widgetSize={widgetSize}
        />
      ) : (
        <>
          <div className={classes.selects}>
            <ConnectedPeriodSelect />
            <ConnectedCategoryTypeSelect className={classes.categoryType} />
          </div>
          <JustCategoryList
            data={categories}
            onCategoryClick={onCategoryClick}
          />
        </>
      )}
      <Footer
        categoryCount={categoryCount}
        Classes={FooterClasses}
        onSeeAllClick={onSeeAllClick}
        paymentCount={paymentCount}
        {...FooterProps}
      />
    </div>
  )
}

OverviewTab.propTypes = {
  categoryCount: PropTypes.number,
  CategoryList: PropTypes.element,
  categoryType: PropTypes.string,
  data: PropTypes.objectOf(pieDataProp),
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  paymentCount: PropTypes.number,
  pieChartRootComponent: PropTypes.element,
  showTotals: PropTypes.bool,
  widgetSize: PropTypes.number.isRequired,
  // Styles
  chartClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  pieClassName: PropTypes.string,
  //
  FooterClasses: footerClasses,
  FooterProps: footerProps,
}

export default injectStyles(styles)(OverviewTab)
