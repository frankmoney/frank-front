import { compose, mapProps, withProps, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'components/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import {
  dataSourceSelector,
  rowDataSelector,
  paymentCardCategoriesSelector,
  searchingSuggestionsSelector,
  suggestedPeersSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

const ComposedPaymentsTableRow = compose(
  withProps({
    type: 'admin',
  })
)(PaymentsTableRow)

const ConnectedPaymentsTableDetailRow = compose(
  reconnect(
    {
      categories: paymentCardCategoriesSelector,
      searchingSuggestions: searchingSuggestionsSelector,
      suggestedPeers: suggestedPeersSelector,
    },
    {
      searchSuggestions: ACTIONS.searchSuggestions,
      paymentUpdate: ACTIONS.paymentUpdate,
      paymentPublish: ACTIONS.paymentPublish,
    }
  ),
  mapProps(({ categories, peers, data, ...otherProps }) => ({
    categories,
    peers,
    ...data,
    ...otherProps,
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
    rowComponent: ComposedPaymentsTableRow,
    rowDetailViewComponent: ConnectedPaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
