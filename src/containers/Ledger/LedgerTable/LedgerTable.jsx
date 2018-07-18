import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { compose, mapProps } from 'recompose'
import * as R from 'ramda'
import DATA from '../data.json'
import LedgerRow from './LedgerTableRow'
import LedgerDetailRow from './LedgerTableDetailRow'

const ids = DATA.transactions.map(x => x.id.toString())
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
    rowComponent: LedgerRow,
    rowDetailViewComponent: LedgerDetailRow,
    dataSourceSelector: R.memoize(() => [{ title: 'April', rows: ids }]),
    rowDataSelector: id => () =>
      DATA.transactions.find(x => x.id.toString() === id.toString()),
    ...props,
  }))
)(Table)
