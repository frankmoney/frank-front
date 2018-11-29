// @flow strict-local
import React from 'react'
import cx from 'classnames'
import CategoryListPieChart from 'components/CategoryListPieChart'
import Paper from 'components/kit/Paper'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import TimelineChart from 'components/common/TimelineChart'
import ExpandRow from './ExpandRow'
import LedgerCategoryList from './LedgerCategoryList'
import styles from './ChartCard.jss'
import Title from './Title'
import CurrentCategory from './CurrentCategory'

export type Props = {|
  ...InjectStylesProps,
  //
  barsColor?: string,
  barsData: BarData,
  barsOnly: boolean,
  categoryType: string,
  onCategoryClick: ?CategoryCb,
  onCategoryTypeChange: ?CategoryCb,
  period: string,
  pieData: GroupedPieData,
|}

export type State = {|
  expanded: boolean,
|}

class ChartCard extends React.PureComponent<Props, State> {
  state = {
    expanded: true,
  }

  handleToggleExpand = expanded => {
    this.setState({ expanded })
  }

  render() {
    const {
      barsColor,
      barsAreClickable,
      barsData,
      barsOnly,
      categoryType,
      classes,
      className,
      onBarsZoomIn,
      onCategoryClick,
      onCategoryTypeChange,
      period,
      pieData,
    } = this.props

    const { expanded } = this.state
    const categories = pieData[categoryType]
    const handleBarsZoomIn = barsAreClickable ? onBarsZoomIn : null

    return (
      <Paper
        className={cx(
          classes.root,
          expanded && classes.cardExpanded,
          className
        )}
      >
        <Title className={classes.header}>{period}</Title>
        {barsOnly ? (
          <>
            <CurrentCategory className={classes.category} />
            <TimelineChart
              className={classes.barChart}
              width={600}
              data={barsData}
              barsColor={barsColor}
            />
          </>
        ) : (
          <>
            <CategoryListPieChart
              categoryType={categoryType}
              CategoryList={LedgerCategoryList}
              className={classes.overview}
              chartSize={260}
              data={categories}
              onCategoryClick={onCategoryClick}
              onCategoryTypeChange={onCategoryTypeChange}
            />
            <ExpandRow
              className={classes.bottomRow}
              expanded={expanded}
              onToggle={this.handleToggleExpand}
              title="Timeline"
            >
              <TimelineChart
                className={classes.barChart}
                width={600}
                data={barsData}
                barsColor={barsColor}
                onZoomIn={handleBarsZoomIn}
              />
            </ExpandRow>
          </>
        )}
      </Paper>
    )
  }
}

export default injectStyles(styles, { fixedGrid: true })(ChartCard)
