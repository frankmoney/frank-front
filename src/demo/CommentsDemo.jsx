import React from 'react'
import cx from 'classnames'
import IconComment from 'material-ui-icons/ModeComment'
import { Button, Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Comments from 'components/Comments'
import Title from 'containers/Ledger/ChartCard/Title'

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

const testComments = [
  {
    id: 0,
    user: {
      name: 'David Liberman',
      picture: 'https://loremflickr.com/80/80/cat',
    },
    comment: {
      date: '2 days ago', // TODO: calculate from real date
      text:
        '@Suzie Alexander Ask me to name the best laptops on the market, and my answer would be some ordering of Apple’s MacBook Pro, Microsoft’s Surface Laptop and Surface Book',
    },
  },
  {
    id: 1,
    user: {
      name: 'Suzie Alexander',
      picture: 'https://loremflickr.com/80/80/kitten',
    },
    comment: {
      date: '7 days ago',
      text:
        'Whether Facebook, Twitter, and Google have intentionally censored conservative users.',
    },
  },
]

// eslint-disable-next-line no-unused-vars
const currentUser = {
  name: 'Anon',
  picture: 'https://loremflickr.com/100/100/grumpy%20cat',
}

class CommentsDemo extends React.Component {
  state = {
    firstBlockOpen: false,
  }

  toggleFirstBlockComments = () =>
    this.setState({ firstBlockOpen: !this.state.firstBlockOpen })

  render() {
    const { classes } = this.props
    return (
      <Demo>
        <DemoCard>
          <Title>Comments</Title>
          <div className={classes.cardBody}>
            {this.state.firstBlockOpen ? 'Open' : 'Closed'}
            <Button
              fat
              icon={IconComment}
              label="Discuss"
              onClick={this.toggleFirstBlockComments}
            />
          </div>
          <Comments
            comments={testComments}
            user={currentUser}
            open={this.state.firstBlockOpen}
          />
        </DemoCard>

        <DemoCard>
          <Title>Comments</Title>
          Some comments
          <Comments comments={testComments} user={currentUser} open />
        </DemoCard>

        <DemoCard>
          <Title>Comments</Title>
          No comments
          <Comments user={currentUser} open />
        </DemoCard>

        <DemoCard>
          <Title>Comments</Title>
          Can not post
          <Comments
            comments={testComments}
            user={currentUser}
            open
            canPost={false}
          />
        </DemoCard>
      </Demo>
    )
  }
}

export default injectStyles(styles)(CommentsDemo)
