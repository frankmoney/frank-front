import { injectStyles } from '@frankmoney/ui'
import { compose, mapProps } from 'recompose'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import { dataSourceSelector, rowDataSelector } from './selectors'

const TABLE_NAME = 'recipient'

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
    name: TABLE_NAME,
    canSelectRows: true,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: PaymentsTableRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
