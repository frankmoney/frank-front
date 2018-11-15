import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { createRouteUrl } from '@frankmoney/utils'
import { injectStyles } from '@frankmoney/ui'
import { ArrowBack as BackIcon } from 'material-ui-icons'
import Header from 'components/public/Header'
import reconnect from 'utils/reconnect'
import { ROUTES } from '../../../const'
import { accountSelector } from './selectors'

const styles = theme => ({
  container: {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: [0, 30],
    ...theme.fontMedium(20, 24),
  },
  left: {
    display: 'flex',
    opacity: 0.7,
    color: theme.colors.black,
    textDecoration: 'none',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  middle: {
    color: '#20284A',
  },
  powered: {
    fontWeight: 400,
    opacity: 0.2,
  },
  frank: {
    color: theme.colors.black,
    opacity: 0.7,
  },
})

const StoryHeader = ({ classes, className, account: { id, name } }) => (
  <Header>
    <div className={cx(classes.container, className)}>
      <Link
        className={classes.left}
        to={createRouteUrl(ROUTES.public.ledger.stories, { accountId: id })}
      >
        <BackIcon className={classes.icon} />
        <div>All stories</div>
      </Link>
      <div className={classes.middle}>{name}</div>
      <div className={classes.right}>
        <span className={classes.powered}>Powered by</span>{' '}
        <span className={classes.frank}>Frank</span>
      </div>
    </div>
  </Header>
)

export default compose(
  reconnect(
    {
      account: accountSelector,
    },
    {}
  ),
  injectStyles(styles)
)(StoryHeader)
