import React from 'react'
import { compose, branch, renderComponent, renderNothing } from 'recompose'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import AreaSpinner from 'components/AreaSpinner'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import InboxListCard from './InboxListCard'
import InboxPager from './InboxPager'
import * as SELECTORS from './selectors'
import ACTIONS from './actions'

const styles = {
  root: {},
  list: {},
  card: {
    marginBottom: 35,
  },
  pagerWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
}

const InboxList = ({ classes, onResetSearch, payments }) => (
  <div className={classes.root}>
    <div className={classes.list}>
      {payments.map(payment => (
        <InboxListCard key={payment.id} className={classes.card} {...payment} />
      ))}
      {payments.length === 0 && (
        <TableEmptyPlaceholder text="payments" onReset={onResetSearch} />
      )}
    </div>
    <div className={classes.pagerWrap}>
      <InboxPager />
    </div>
  </div>
)

export default compose(
  reconnect(
    {
      loaded: SELECTORS.loaded,
      listReloading: SELECTORS.listReloading,
      payments: SELECTORS.payments,
    },
    {
      onResetSearch: ACTIONS.resetSearch,
    }
  ),
  branch(props => !props.loaded, renderNothing),
  branch(props => props.listReloading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(InboxList)
