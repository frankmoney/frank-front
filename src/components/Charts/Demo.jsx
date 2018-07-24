import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Title from 'containers/Ledger/GraphOverviewCard/Title'
import BarChart, { Tooltip as ChartTooltip } from './Bar'
import PieChart, { injectIndex } from './Pie'

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
  ledgerCard: {
    marginLeft: 60,
  },
  pieContainer: {
    display: 'flex',
  },
  pieLegend: {
    display: 'inline-flex',
    cursor: 'pointer',
    flexDirection: 'column',
    marginLeft: 50,
    justifyContent: 'space-between',
    height: '8em',
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

const dualData = [
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
  { name: 'Other categories', value: 14 },
]

const tooltipPayload = [
  { value: 481, color: '#21CB61', caption: 'Income' },
  { value: -14899, color: '#484DE7', caption: 'Spending' },
]

class PieDemo extends React.Component {
  state = {
    activeIndex: null,
    hoveredPieIndex: null,
  }

  handleLegendOver = index => () => this.setState({ activeIndex: index })

  handleLegendOut = () => this.setState({ activeIndex: null })

  handlePieOver = index => this.setState({ hoveredPieIndex: index })

  handlePieOut = () => this.setState({ hoveredPieIndex: null })

  render() {
    const { classes } = this.props
    const data = injectIndex(pieData)
    return (
      <div className={classes.pieContainer}>
        <PieChart
          data={pieData}
          activeIndex={this.state.activeIndex}
          onMouseEnter={this.handlePieOver}
          onMouseLeave={this.handlePieOut}
        />
        <ul className={classes.pieLegend}>
          {R.map(
            ({ color, name, value, index }) => (
              <li
                onMouseOver={this.handleLegendOver(index)}
                onMouseOut={this.handleLegendOut}
                style={{
                  color,
                  fontWeight: this.state.hoveredPieIndex === index ? 500 : 400,
                }}
              >
                {name} {value}
              </li>
            ),
            data
          )}
        </ul>
      </div>
    )
  }
}

const ChartsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <DemoCard className={classes.ledgerCard}>
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
      <BarChart dual data={dualData} />
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
