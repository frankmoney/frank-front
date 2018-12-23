// @flow strict-local
import * as React from 'react'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import PieTotalSelect from 'components/OverviewPieChart/PieTotalSelect'
import Totals, { type TotalsProps } from 'containers/widgets/Totals'
import Footer, {
  type FooterClasses,
  type FooterProps,
} from 'containers/widgets/Footer'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import JustCategoryList from './JustCategoryList'
import OverviewChart from './OverviewChart'

const styles = {
  selects: {
    display: 'flex',
    flexShrink: 0,
    margin: [6, 0, -1, 2],
  },
  standaloneCategoryType: {
    alignItems: 'normal',
    marginLeft: 27,
    padding: 0,
    position: 'static',
  },
}

type EmptyCb = () => void

export type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  //
  categoryCount?: number,
  CategoryList?: CategoryListComponent,
  paymentCount?: number,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieItems: PieChartCategories,
  totals: ?TotalsProps,
  widgetSize: 375 | 400 | 500 | 625 | 800,
  // Handlers
  onCategoryClick: CategoryCb,
  onSeeAllClick: EmptyCb,
  // Styles
  chartClassName?: string,
  contentClassName?: string,
  periodSelectClassName?: string,
  pieClassName?: string,
  //
  FooterClasses?: FooterClasses,
  FooterProps?: FooterProps,
  //
  PeriodSelect: ?React.Element<any>, // flowlint-line unclear-type:off
|}

const OverviewTab = ({
  categoryCount,
  CategoryList,
  chartClassName,
  classes,
  contentClassName,
  FooterClasses: footerClasses,
  FooterProps: footerProps,
  onCategoryClick,
  onPieTotalChange,
  onSeeAllClick,
  paymentCount,
  PeriodSelect,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  pieTotal,
  pieTotalSelectable,
  totals,
  widgetSize,
}: Props) => (
  <div className={contentClassName}>
    {totals && <Totals {...totals} />}
    {widgetSize !== 400 ? (
      <OverviewChart
        CategoryList={CategoryList}
        className={chartClassName}
        onCategoryClick={onCategoryClick}
        onPieTotalChange={onPieTotalChange}
        PeriodSelect={PeriodSelect}
        pieChartRootComponent={pieChartRootComponent}
        pieClassName={pieClassName}
        pieItems={pieItems}
        pieTotal={pieTotal}
        pieTotalSelectable={pieTotalSelectable}
        widgetSize={widgetSize}
      />
    ) : (
      <>
        <div className={classes.selects}>
          {PeriodSelect}
          <PieTotalSelect
            className={classes.standaloneCategoryType}
            onChange={onPieTotalChange}
            value={pieTotal}
          />
        </div>
        <JustCategoryList
          onCategoryClick={onCategoryClick}
          pieItems={pieItems}
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

export default injectStyles(styles)(OverviewTab)
