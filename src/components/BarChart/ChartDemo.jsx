import React from 'react'
import cx from 'classnames'
import { Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Title from 'containers/Ledger/GraphOverviewCard/Title'
import BarChart from './BarChart'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 22),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 35,
    width: 850,
    '&:last-child': {
      marginBottom: 180,
    },
  },
  inboxCard: {
    paddingTop: 40,
    paddingBottom: 40,
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
  <Paper className={cx(classes.card, classes.inboxCard, className)}>
    {children}
  </Paper>
))

// const testData = []

const ChartsDemo = () => (
  <Demo>
    <DemoCard>
      <Title>BarChart</Title>
      <BarChart />
    </DemoCard>
  </Demo>
)

export default injectStyles(styles)(ChartsDemo)
