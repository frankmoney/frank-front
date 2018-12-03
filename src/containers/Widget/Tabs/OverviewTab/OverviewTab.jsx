// @flow strict-local
import React from 'react'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
} from 'components/OverviewPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import ConnectedCategoryTypeSelect from 'containers/Widget/ConnectedCategoryTypeSelect'
import Totals from 'containers/Widget/Totals'
import Footer, {
  type FooterClasses,
  type FooterProps,
} from 'containers/Widget/Footer'
import type { GroupedPieData } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
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

type EmptyCb = () => void

export type Props = {|
  ...InjectStylesProps,
  //
  categoryCount?: number,
  CategoryList?: CategoryListComponent,
  categoryType: string,
  data: GroupedPieData,
  paymentCount?: number,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  showTotals?: boolean,
  widgetSize: 375 | 400 | 500 | 625 | 800,
  // Handlers
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  onSeeAllClick: EmptyCb,
  // Styles
  chartClassName?: string,
  contentClassName?: string,
  periodSelectClassName?: string,
  pieClassName?: string,
  //
  FooterClasses?: FooterClasses,
  FooterProps?: FooterProps,
|}

const OverviewTab = ({
  categoryCount,
  CategoryList,
  categoryType,
  chartClassName,
  classes,
  contentClassName,
  data,
  FooterClasses: footerClasses,
  FooterProps: footerProps,
  onCategoryClick,
  onCategoryTypeChange,
  onSeeAllClick,
  paymentCount,
  pieChartRootComponent,
  pieClassName,
  showTotals,
  widgetSize,
}: Props) => {
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
        Classes={footerClasses}
        onSeeAllClick={onSeeAllClick}
        paymentCount={paymentCount}
        {...footerProps}
      />
    </div>
  )
}

export default injectStyles(styles)(OverviewTab)
