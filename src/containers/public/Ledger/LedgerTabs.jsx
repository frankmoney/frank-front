import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Link } from 'react-router-dom'
import { createRouteUrl } from '@frankmoney/utils'
import { branch, compose, renderNothing } from 'recompose'
import {
  ChromeReaderMode as LedgerIcon,
  BurstMode as StoriesIcon,
} from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import { ROUTES } from 'const'
import {
  accountIdSelector,
  storiesCountSelector,
  currentTabSelector,
} from './selectors'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    ...theme.fontMedium(20, 24),
    textDecoration: 'none',
    color: theme.colors.black,
    transition: theme.transition('opacity'),
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  tabLabel: {
    marginLeft: 15,
  },
  tabCounter: {
    marginLeft: 10,
    fontWeight: 400,
  },
  tabActive: {
    opacity: 1,
    color: theme.colors.blue,
  },
})

const LedgerTabs = ({
  classes,
  className,
  accountId,
  currentTab,
  storiesCount,
}) => (
  <div className={cx(classes.root, className)}>
    <Link
      className={cx(classes.tab, currentTab === 'ledger' && classes.tabActive)}
      to={createRouteUrl(ROUTES.public.ledger.idRoot, { accountId })}
    >
      <LedgerIcon />
      <div className={classes.tabLabel}>Ledger</div>
    </Link>

    <Link
      className={cx(classes.tab, currentTab === 'stories' && classes.tabActive)}
      to={createRouteUrl(ROUTES.public.ledger.stories, { accountId })}
    >
      <StoriesIcon />
      <div className={classes.tabLabel}>
        Stories<span className={classes.tabCounter}>{storiesCount}</span>
      </div>
    </Link>
  </div>
)

export default compose(
  reconnect({
    accountId: accountIdSelector,
    currentTab: currentTabSelector,
    storiesCount: storiesCountSelector,
  }),
  branch(({ storiesCount }) => storiesCount === 0, renderNothing),
  injectStyles(styles)
)(LedgerTabs)
