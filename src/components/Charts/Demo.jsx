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
  { key: 'Jan', value: 135 },
  { key: 'Feb', value: 170 },
  { key: 'Mar', value: 135 },
  { key: 'Apr', value: 75 },
  { key: 'May', value: 100 },
  { key: 'Jun', value: 75 },
  { key: 'Jul', value: 60 },
  { key: 'Aug', value: 0 },
  { key: 'Sep', value: 190 },
  { key: 'Oct', value: 60 },
]

const dualData = [
  { key: 'Jan', value: 39, negativeValue: 67 },
  { key: 'Feb', value: 49, negativeValue: 84 },
  { key: 'Mar', value: 0, negativeValue: 67 },
  { key: 'Apr', value: 0, negativeValue: 36 },
  { key: 'May', value: 13, negativeValue: 50 },
  { key: 'Jun', value: 29, negativeValue: 35 },
  { key: 'Jul', value: 0, negativeValue: 29 },
  { key: 'Aug', value: 0, negativeValue: 0 },
  { key: 'Sep', value: 24, negativeValue: 94 },
  { key: 'Oct', value: 0, negativeValue: 29 },
]

const pieData = [
  { key: 'Operational expenses', value: 36, fill: '#8725FB' },
  { key: 'Marketing', value: 25, fill: '#21CB61' },
  { key: 'Program expenses', value: 12, fill: '#0624FB' },
  { key: 'Street outreach', value: 7, fill: '#FC1891' },
  { key: 'Other categories', value: 14 },
]

const tooltipPayload = [
  { value: 481, fill: '#21CB61', caption: 'Income' },
  { value: -14899, fill: '#484DE7', caption: 'Spending' },
]

class PieDemo extends React.Component {
  state = {
    activeIndex: null,
  }

  handleLegendOver = index => () => this.setState({ activeIndex: index })

  handleLegendOut = () => this.setState({ activeIndex: null })

  render() {
    const { classes } = this.props
    const data = injectIndex(pieData)
    return (
      <div className={classes.pieContainer}>
        <PieChart data={pieData} activeIndex={this.state.activeIndex} />
        <ul className={classes.pieLegend}>
          {R.map(
            ({ fill, key, index }) => (
              <li
                onMouseOver={this.handleLegendOver(index)}
                onMouseOut={this.handleLegendOut}
                style={{ color: fill }}
              >
                {key}
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
