import { injectStyles } from '@frankmoney/ui'
import { connect } from 'react-redux'
import { Table } from '@frankmoney/components'
import { compose, mapProps } from 'recompose'
import {
  dataSourceSelector,
  rowDataSelector,
  searchTextSelector,
} from '../selectors'
import LedgerRow from './LedgerTableRow'
import LedgerDetailRow from './LedgerTableDetailRow'

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: props => props.grid.fixed.contentWidth,
    position: 'relative',
  },
}

const ConnectedLedgerRow = connect(state => ({
  searchText: searchTextSelector(state),
}))(LedgerRow)

export default compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...props }) => ({
    name: 'ledger',
    canSelectRows: true,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ConnectedLedgerRow,
    rowDetailViewComponent: LedgerDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
