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

const CommentsDemo = () => (
  <Demo>
    <DemoCard>
      <Title>Comments</Title>
      Some content
      <Comments />
    </DemoCard>
  </Demo>
)

export default injectStyles(styles)(CommentsDemo)
