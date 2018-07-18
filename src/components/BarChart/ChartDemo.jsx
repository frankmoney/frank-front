import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Title from 'containers/Ledger/GraphOverviewCard/Title'
import BarChart, { Tooltip as ChartTooltip } from './BarChart'

const styles = theme => ({
  root: {
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
})

const Demo = injectStyles(styles)(({ classes, children }) => (
  <div className={classes.root}>{children}</div>
))

const DemoCard = injectStyles(styles)(({ children, classes, className }) => (
  <Paper className={cx(classes.card, className)}>{children}</Paper>
))

const testData = [
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

const ChartsDemo = () => (
  <Demo>
    <DemoCard>
      <Title>BarChart</Title>
      <BarChart data={testData} width={790} height={260} barColor="#484DE7" />
    </DemoCard>

    <DemoCard>
      <Title>BarChart (less data)</Title>
      <BarChart
        data={R.take(8, testData)}
        width={790}
        height={260}
        barColor="#484DE7"
      />
    </DemoCard>

    <DemoCard>
      <Title>Tooltip</Title>
      <ChartTooltip
        style={{ maxWidth: 300 }}
        label="May"
        payload={[{ value: '481' }, { value: '14899' }]}
      />
    </DemoCard>
  </Demo>
)

export default injectStyles(styles)(ChartsDemo)
