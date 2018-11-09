import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { Currency } from '@frankmoney/components'
import reconnect from 'utils/reconnect'
import {
  nameSelector,
  revenueSelector,
  spendingSelector,
  totalSelector,
} from '../selectors'
import styles from './LedgerStats.jss'
import About from './About'

class LedgerStats extends React.Component {
  render() {
    const {
      classes,
      className,
      name,
      info,
      revenue,
      spending,
      total,
    } = this.props
    return (
      <div className={cx(classes.root, className)}>
        <div className={classes.title}>{name}</div>
        <div className={classes.stats}>
          {revenue !== 0 && (
            <div className={classes.stat}>
              <div className={classes.statLabel}>Income</div>
              <Currency className={classes.statSum} value={revenue} />
            </div>
          )}
          {spending !== 0 && (
            <div className={classes.stat}>
              <div className={classes.statLabel}>Spending</div>
              <Currency className={classes.statSum} value={spending} />
            </div>
          )}
          <div className={classes.stat}>
            <div className={classes.statLabel}>Balance</div>
            <Currency className={classes.statSum} value={total} />
          </div>
        </div>
        <About
          maxLines={4}
          classNames={{
            root: classes.info,
            text: classes.infoText,
            handler: classes.infoMore,
          }}
        >
          MakeaChamp is the leader in crowdfunding for competitive sports. Our
          global platform aims to level the playing field and ensure every
          competitive athlete gets the support they need to succeed. Behind
          every champion, there’s a crowd of supporters, and we’ve got the stats
          to prove it. Over 18,000 athletes, teams and clubs from 52 countries
          leverage the power of crowdfunding on MakeaChamp to raise funds, share
          their story and grow their fanbase. Six of these athletes made it to
          the Sochi 2014 Winter Olympics, and more went on to become local,
          national and international champions.
        </About>
      </div>
    )
  }
}

export default compose(
  reconnect({
    name: nameSelector,
    spending: spendingSelector,
    revenue: revenueSelector,
    total: totalSelector,
  }),
  injectStyles(styles)
)(LedgerStats)
