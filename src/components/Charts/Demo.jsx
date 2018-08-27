import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Title from 'containers/Ledger/GraphOverviewCard/Title'
import CategoryList from 'components/CategoryList'
import limitCategories from 'utils/limitCategories'
import BarChart, { Tooltip as ChartTooltip } from './Bar'
import PieChart from './Pie'

const styles = theme => ({
  demo: {
    ...theme.fontRegular(16, 22),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 35,
    padding: [30, 30, 40],
    width: 850,
    '&:last-child': {
      marginBottom: 180,
    },
  },
  cardBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieContainer: {
    display: 'flex',
    paddingLeft: 30,
  },
  pieLegend: {
    display: 'inline-flex',
    cursor: 'pointer',
    flexDirection: 'column',
    marginLeft: 50,
    justifyContent: 'space-between',
    height: '8em',
  },
  pieLegendActive: {
    '& > *': {
      opacity: 0.4,
    },
    '&:hover > *': {
      opacity: 'unset',
    },
  },
  activeLegendItem: {
    opacity: 1,
  },
})

const DemoCard = injectStyles(styles)(({ children, classes, className }) => (
  <Paper className={cx(classes.card, className)}>{children}</Paper>
))

const singularData = [
  { name: 'Jan', value: 135 },
  { name: 'Feb', value: 170 },
  { name: 'Mar', value: 135 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 60 },
  { name: 'Aug', value: 0 },
  { name: 'Sep', value: 190 },
  { name: 'Oct', value: 60 },
]

const barsData = [
  { name: 'Jan', value: 39, negativeValue: 67 },
  { name: 'Feb', value: 49, negativeValue: 84 },
  { name: 'Mar', value: 0, negativeValue: 67 },
  { name: 'Apr', value: 0, negativeValue: 36 },
  { name: 'May', value: 13, negativeValue: 50 },
  { name: 'Jun', value: 29, negativeValue: 35 },
  { name: 'Jul', value: 0, negativeValue: 29 },
  { name: 'Aug', value: 0, negativeValue: 0 },
  { name: 'Sep', value: 24, negativeValue: 94 },
  { name: 'Oct', value: 0, negativeValue: 29 },
]

const pieData = [
  { name: 'Operational expenses', value: 36, color: '#8725FB' },
  { name: 'Marketing', value: 25, color: '#21CB61' },
  { name: 'Program expenses', value: 12, color: '#0624FB' },
  { name: 'Street outreach', value: 7, color: '#FC1891' },
  { color: '#FF9C28', name: 'Advertising', value: 2 },
  { color: '#00DCEA', name: 'Sales', value: 2 },
]

const tooltipPayload = [
  { value: 481, color: '#21CB61', caption: 'Income' },
  { value: -14899, color: '#484DE7', caption: 'Spending' },
]

class PieDemo extends React.Component {
  state = {
    activeKey: null,
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const { classes } = this.props
    const limitedCategories = limitCategories(pieData)
    const { other, items } = limitedCategories
    const pieItems = R.append(other, items)
    return (
      <div className={classes.pieContainer}>
        <PieChart
          data={pieItems}
          activeKey={this.state.activeKey}
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
        />
        <CategoryList
          activeKey={this.state.activeKey}
          activeLabelClassName={classes.activeLegendItem}
          className={cx(classes.pieLegend, {
            [classes.pieLegendActive]: this.state.activeKey !== null,
          })}
          limitedCategories={limitedCategories}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueUnit="%"
        />
      </div>
    )
  }
}

const ChartsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <DemoCard>
      <Title>PieChart</Title>
      <PieDemo classes={classes} />
    </DemoCard>

    <DemoCard>
      <Title>BarChart</Title>
      <BarChart
        data={singularData}
        width={790}
        height={260}
        barColor="#484DE7"
      />
    </DemoCard>

    <DemoCard>
      <Title>Double BarChart</Title>
      <BarChart dual data={barsData} />
    </DemoCard>

    <DemoCard>
      <Title>Custom BarChart</Title>
      <BarChart
        data={singularData}
        width={334}
        height={220}
        barColor="#FC1891"
        footerPadding={15}
        caption="Expenses"
      />
    </DemoCard>

    <DemoCard>
      <Title>Tooltip</Title>
      <ChartTooltip
        style={{ display: 'inline-block' }}
        label="May"
        payload={tooltipPayload}
      />
    </DemoCard>
  </div>
)

export default injectStyles(styles)(ChartsDemo)
