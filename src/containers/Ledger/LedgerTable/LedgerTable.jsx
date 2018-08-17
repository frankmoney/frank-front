import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { compose, mapProps } from 'recompose'
import {
  PaymentsTableRow,
  PaymentsTableDetailRow,
} from 'components/PaymentsTable'
import { dataSourceSelector, rowDataSelector } from '../selectors'

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
    rowDetailViewComponent: PaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
