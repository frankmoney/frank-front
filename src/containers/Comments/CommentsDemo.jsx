import React from 'react'
import cx from 'classnames'
import { Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Comments from 'containers/Comments'
import Title from 'containers/Ledger/GraphOverviewCard/Title'

const styles = theme => ({
  root: {
    ...theme.fontRegular(14),
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
})

const Demo = injectStyles(styles)(({ classes, children }) => (
  <div className={classes.root}>{children}</div>
))

const DemoCard = injectStyles(styles)(({ children, classes, className }) => (
  <Paper className={cx(classes.card, classes.inboxCard, className)}>
    {children}
  </Paper>
))

const testComments = [
  {
    user: { name: 'David Liberman' },
    date: '2 days ago', // TODO: calculate from real date
    text:
      '@Suzie Alexander Ask me to name the best laptops on the market, and my answer would be some ordering of Apple’s MacBook Pro, Microsoft’s Surface Laptop and Surface Book',
  },
  {
    user: { name: 'Suzie Alexander' },
    date: '7 days ago',
    text:
      'Whether Facebook, Twitter, and Google have intentionally censored conservative users.',
  },
]

const CommentsDemo = () => (
  <Demo>
    <DemoCard>
      <Title>Comments</Title>
      Closed
      <Comments comments={testComments} />
    </DemoCard>

    <DemoCard>
      <Title>Comments</Title>
      Some comments
      <Comments comments={testComments} open />
    </DemoCard>

    <DemoCard>
      <Title>Comments</Title>
      No comments
      <Comments open />
    </DemoCard>
  </Demo>
)

export default injectStyles(styles)(CommentsDemo)
