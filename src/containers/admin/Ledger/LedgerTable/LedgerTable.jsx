import * as R from 'ramda'
import { compose, mapProps, withStateHandlers, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'components/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import {
  dataSourceSelector,
  rowDataSelector,
  categoriesSelector,
  searchingSuggestionsSelector,
  suggestedPeersSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

const ConnectedPaymentsTableDetailRow = compose(
  reconnect(
    {
      categories: categoriesSelector,
      searchingSuggestions: searchingSuggestionsSelector,
      suggestedPeers: suggestedPeersSelector,
    },
    {
      searchSuggestions: ACTIONS.searchSuggestions,
      paymentUpdate: ACTIONS.paymentUpdate,
      paymentPublish: ACTIONS.paymentPublish,
    }
  ),
  withStateHandlers(({ categories, peers, data }) => ({
    categories,
    peers,
    ...data,
  })),
  withHandlers({
    onPeerSuggestionSearch: ({ searchSuggestions }) => search => {
      searchSuggestions({ search, peers: true })
    },
    onDescriptionSuggestionSearch: ({ searchSuggestions }) => search => {
      searchSuggestions({ search, descriptions: true })
    },
    onPaymentUpdate: ({ paymentUpdate }) => changes => {
      paymentUpdate(changes)
    },
    onPaymentPublish: ({ paymentPublish }) => () => {
      paymentPublish()
    },
  })
)(PaymentCard)

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: props => props.grid.fixed.contentWidth,
    position: 'unset',
    left: 'unset',
    transform: 'unset',
  },
}

export default compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...props }) => ({
    name: 'ledger',
    canSelectRows: true,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: PaymentsTableRow,
    rowDetailViewComponent: ConnectedPaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
