import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { compose, mapProps } from 'recompose'
import * as R from 'ramda'
import DATA from '../data.json'
import LedgerRow from './LedgerTableRow'

const ids = DATA.transactions.map(x => x.id)
const styles = {
  header: {
    paddingBottom: 19,
  },
}

export default compose(
  injectStyles(styles),
  mapProps(({ classes, ...props }) => ({
    name: 'ledger',
    canSelectRows: true,
    tableHeaderClassName: classes.header,
    rowComponent: LedgerRow,
    dataSourceSelector: R.memoize(() => [{ title: 'April', rows: ids }]),
    rowDataSelector: id => () => DATA.transactions.find(x => x.id === id),
    ...props,
  }))
)(Table)
