import * as R from 'ramda'
import { compose, mapProps, withStateHandlers, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import {
  PaymentsTableRow,
  PaymentsTableDetailRow,
} from 'components/PaymentsTable'
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
    { searchSuggestions: ACTIONS.searchSuggestions }
  ),
  withStateHandlers(
    ({
      categories,
      peers,
      data: { peerName, peer, category, description },
    }) => ({
      categories,
      peers,
      peerId: peer ? peer.id : '',
      peerName: peer ? peer.name : peerName || '',
      categoryId: category ? category.id : '-',
      description: description || '',
      similarCount: 10,
    })
  ),
  withHandlers({
    onPeerSuggestionSearch: ({ searchSuggestions }) => search => {
      searchSuggestions({ search, peers: true })
    },
    onPeerChange: ({ peers }) => peerId => {
      const peer = R.find(R.propEq('id', peerId), peers)
      return {
        peerId: peer ? peer.id : '',
        peerName: peer ? peer.name : '',
      }
    },
    onCategoryChange: ({ categories }) => categoryId => {
      const category = R.find(R.propEq('id', categoryId), categories)
      return { categoryId: category ? category.id : '-' }
    },
    onDescriptionSuggestionSearch: ({ searchSuggestions }) => search => {
      searchSuggestions({ search, descriptions: true })
    },
    onDescriptionChange: () => description => ({ description }),
  })
)(PaymentsTableDetailRow)

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: props => props.grid.fixed.contentWidth,
    position: 'relative',
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
