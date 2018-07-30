import { injectStyles } from '@frankmoney/ui'
import { connect } from 'react-redux'
import { Table } from '@frankmoney/components'
import { compose, mapProps } from 'recompose'
import {
  PaymentsTableRow,
  PaymentsTableDetailRow as rowDetailViewComponent,
} from 'components/PaymentsTable'
import {
  dataSourceSelector,
  rowDataSelector,
  searchTextSelector,
} from '../selectors'

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
}))(PaymentsTableRow)

export default compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...props }) => ({
    name: 'ledger',
    canSelectRows: true,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ConnectedLedgerRow,
    rowDetailViewComponent,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
