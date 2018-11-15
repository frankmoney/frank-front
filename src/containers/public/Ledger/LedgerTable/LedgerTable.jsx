import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, withProps, mapProps, withStateHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import {
  PaymentsTableRow,
  PaymentsTableDetailRow,
} from 'components/PaymentsTable'
import {
  dataSourceSelector,
  rowDataSelector,
  categoriesSelector,
  allPeersSelector,
} from '../selectors'

const ComposedPaymentsTableRow = compose(
  withProps({
    tablePadding: 30,
  })
)(PaymentsTableRow)

const ConnectedPaymentsTableDetailRow = compose(
  connect(state => ({
    categories: categoriesSelector(state),
    peers: allPeersSelector(state),
  })),
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
      description,
    }),
    {
      onPeerIdChange: ({ peers }) => peerId => {
        const peer = R.find(R.propEq('id', peerId), peers)
        return {
          peerId: peer ? peer.id : '',
          peerName: peer ? peer.name : '',
        }
      },
      onPeerNameChange: () => peerName => ({ peerId: null, peerName }),
      onCategoryIdChange: ({ categories }) => categoryId => {
        const category = R.find(R.propEq('id', categoryId), categories)
        return { categoryId: category ? category.id : '-' }
      },
      onDescriptionChange: () => description => ({ description }),
    }
  )
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
    canSelectRows: false,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ComposedPaymentsTableRow,
    // rowDetailViewComponent: ConnectedPaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
